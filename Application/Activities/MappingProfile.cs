using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDto>();
            CreateMap<UserActivity, AttendeeDto>()
            // d pour destination et s pour source
            .ForMember(d => d.Username, obj => obj.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.DisplayName, obj => obj.MapFrom(s => s.AppUser.DisplayName));
        }
    }
}