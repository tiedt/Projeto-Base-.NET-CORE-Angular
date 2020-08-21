using AutoMapper;
using AutoMapper.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.Domain;
using Project.Repository;
using Project.WebAPI.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.WebAPI.Controllers
{
    [Route("/cliente")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly IMapper _mapper;
        public readonly IProjectRepository _repo;

        public ClienteController(IProjectRepository repo,
                              IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("GetCliente")]
        public async Task<IActionResult> GetCliente()
        {
            return Ok(new ClienteDto());
        }

        [HttpGet("GetAllClienteByUserId/{userId}")]
        public async Task<IActionResult> GetAllClienteByUserId(string userId)
        {
            try
            {
                var users = await _repo.GetAllClientesAsync(userId);
                var results = _mapper.Map<ClienteDto[]>(users);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco Dados Falhou {ex.Message}");
            }
        }

        [HttpGet("{ClienteId}")]
        public async Task<IActionResult> Get(int ClienteId)
        {
            try
            {
                var user = await _repo.GetClienteAsyncById(ClienteId);
                var results = _mapper.Map<ClienteDto>(user);

                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou");
            }
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post(ClienteDto model)
        {
            try
            {
                var evento = _mapper.Map<Cliente>(model);

                _repo.Add(evento);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/evento/{model.ClienteId}", _mapper.Map<ClienteDto>(evento));
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco Dados Falhou {ex.Message}");
            }

            return BadRequest();
        }

        [HttpPut("{ClienteId}")]
        public async Task<IActionResult> Put(int ClienteId, ClienteDto model)
        {
            try
            {
                var cliente = await _repo.GetClienteAsyncById(ClienteId);
                if (cliente == null) return NotFound();
                if (model.Endereco != null)
                {
                    var idEndereco = new List<int>();

                    model.Endereco.ForEach(item => idEndereco.Add(item.EnderecoId));

                    var clientes = cliente.Endereco.Where(
                        endereco => !idEndereco.Contains(endereco.EnderecoId)
                    ).ToArray();

                    if (clientes.Length > 0) _repo.DeleteRange(clientes);
                }
                _mapper.Map(model, cliente);

                _repo.Update(cliente);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/cliente/{model.ClienteId}", _mapper.Map<ClienteDto>(cliente));
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou " + ex.Message);
            }

            return BadRequest();
        }

        [HttpDelete("{ClienteId}")]
        public async Task<IActionResult> Delete(int ClienteId)
        {
            try
            {
                var cliente = await _repo.GetClienteAsyncById(ClienteId);
                if (cliente == null) return NotFound();

                _repo.Delete(cliente);

                if (await _repo.SaveChangesAsync())
                {
                    return Ok();
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou");
            }

            return BadRequest();
        }
    }
}