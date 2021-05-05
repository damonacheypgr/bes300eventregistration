using EventsAPI.Controllers;
using EventsAPI.Data;
using EventsAPI.Services;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventsAPI.Hubs
{
    public class RegistrationsHub : Hub
    {
        private readonly EventsDataContext _context;
        private readonly EventRegistrationChannel _channel;

        public RegistrationsHub(EventsDataContext context, EventRegistrationChannel channel)
        {
            _context = context;
            _channel = channel;
        }

        public async Task addRegistration(WsRegistrationRequest request)
        {
            var savedEvent = await _context.Events.SingleOrDefaultAsync(e => e.Id == request.EventId);
            if (savedEvent == null)
            {
                await Clients.Caller.SendAsync("noEventFor", request.EventId);
            } else
            {
                EventRegistration registration = new()
                {
                    EmployeeId = request.Request.Id,
                    Name = request.Request.FirstName + " " + request.Request.LastName,
                    EMail = request.Request.Email,
                    Phone = request.Request.Phone,
                    Status = EventRegistrationStatus.Pending
                };
                savedEvent.Registrations.Add(registration);
                await _context.SaveChangesAsync();
                await _channel.AddRegistration(new EventRegistrationChannelRequest(registration.Id, Context.ConnectionId));
                await Clients.Caller.SendAsync("registrationAdded", registration);
            }
        }
    }

    public record WsRegistrationRequest(int EventId, PostReservationRequest Request);
}
