using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Unattend
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);

                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Activity = "Activité introuvable" });

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var attendance = await _context.UserActivities.SingleOrDefaultAsync(x => x.ActivityId == activity.Id && x.AppUserId == user.Id);

                if (attendance == null)
                return Unit.Value;

                if (attendance.IsHost)
                throw new RestException(HttpStatusCode.BadRequest, new {Attendance = "Vous ne pouvez pas vous retirer en tant qu'organisateur"});

                _context.UserActivities.Remove(attendance);

                // pour savoir si la requête est exécutée avec succès
                var success = await _context.SaveChangesAsync() > 0;
                // si succès => activity ajouté dans database et code 200. 
                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}