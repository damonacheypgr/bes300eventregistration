﻿using EventsAPI.Data;
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
        

        public BackgroundRegistrationWorker(ILogger<BackgroundRegistrationWorker> logger, EventRegistrationChannel channel, IServiceProvider serviceProvider)
        {
            _logger = logger;
            _channel = channel;
            _serviceProvider = serviceProvider;
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

                if (await client.CheckEmployeeIsActive(savedRegistration.EmployeeId))
                {
                    savedRegistration.Status = EventRegistrationStatus.Approved;
                } else
                {
                    savedRegistration.Status = EventRegistrationStatus.Denied;
                    savedRegistration.ReasonForDenial = "The Employee Is Not Active";
                    
                }
                await context.SaveChangesAsync(stoppingToken);
            }
        }
    }
}
