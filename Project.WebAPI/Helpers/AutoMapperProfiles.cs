using System.Linq;
using AutoMapper;
using Project.Domain;
using Project.Domain.Identity;
using Project.WebAPI.Dtos;

namespace Project.WebAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UserLoginDto>().ReverseMap();
            CreateMap<Endereco,EnderecoDto>().ReverseMap();
            CreateMap<Cliente, ClienteDto>().ReverseMap();
        }
    }
}