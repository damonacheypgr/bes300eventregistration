using EventsAPI.Data;
using EventsAPI.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EventsAPI.Services
{
    public class BackgroundRegistrationWorker : BackgroundService
    {

        private readonly ILogger<BackgroundRegistrationWorker> _logger;
        private readonly EventRegistrationChannel _channel;
        private readonly IServiceProvider _serviceProvider;
        private readonly IHubContext<RegistrationsHub> _hub;


        public BackgroundRegistrationWorker(ILogger<BackgroundRegistrationWorker> logger, EventRegistrationChannel channel, IServiceProvider serviceProvider, IHubContext<RegistrationsHub> hub)
        {
            _logger = logger;
            _channel = channel;
            _serviceProvider = serviceProvider;
            _hub = hub;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await foreach(var registration in _channel.ReadAllAsync(stoppingToken))
            {
                // ask the employee API if that is a still a active employee
                using var scope = _serviceProvider.CreateScope();
                var client = scope.ServiceProvider.GetRequiredService<ILookupEmployees>();
                var context = scope.ServiceProvider.GetRequiredService<EventsDataContext>();
               

                var savedRegistration = await context.EventRegistrations
                       .SingleOrDefaultAsync(e => e.Id == registration.RegistrationId);
                var hasWsConnection = registration.WsClient != null;

                if (hasWsConnection)
                {
                    await _hub.Clients.Client(registration.WsClient).SendAsync("sendMessage", new { message = $"Checking if {savedRegistration.Name} is an active employee..." });
                }

                if (await client.CheckEmployeeIsActive(savedRegistration.EmployeeId))
                {

                    savedRegistration.Status = EventRegistrationStatus.Approved;
                    if (hasWsConnection)
                    {
                        await _hub.Clients.Client(registration.WsClient).SendAsync("sendMessage", new { message = $"{savedRegistration.Name} is an active employee, and is approved." });
                    }
                } else
                {
                    savedRegistration.Status = EventRegistrationStatus.Denied;
                    savedRegistration.ReasonForDenial = "The Employee Is Not Active";
                    if (hasWsConnection)
                    {
                        await _hub.Clients.Client(registration.WsClient).SendAsync("sendMessage", new { message = $"{savedRegistration.Name} is not an active employee, and is denied." });
                    }

                }
                await context.SaveChangesAsync(stoppingToken);
                if (hasWsConnection)
                {
                    switch (savedRegistration.Status)
                    {
                        case EventRegistrationStatus.Approved:
                            await _hub.Clients.Client(registration.WsClient).SendAsync("registrationApproved", new { registrationId = savedRegistration.Id, status = "Approved" });
                            break;
                        case EventRegistrationStatus.Denied:
                            await _hub.Clients.Client(registration.WsClient).SendAsync("registrationDenied", new { registrationId = savedRegistration.Id, status = "Denied", reason = savedRegistration.ReasonForDenial });
                            break;
                    } 
                }
            }
        }
    }
}
