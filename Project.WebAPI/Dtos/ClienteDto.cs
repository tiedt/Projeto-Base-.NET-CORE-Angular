using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Project.WebAPI.Dtos
{
    public class ClienteDto
    {
        [Required(ErrorMessage = "Campo Obrigatório")]
        public int ClienteId { get; set; }
        [Required(ErrorMessage = "Campo Obrigatório")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Nome do Cliente é entre 4 e 50 caracteres")]
        public string NomeCliente { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        [Phone]
        public string NumeroTelefone { get; set; }
        public string CPF { get; set; }
        public string CNPJ { get; set; }
        public int TipoCliente { get; set; }
        public string UserId { get; set; }
        public int EnderecoId { get; set; }
        public List<EnderecoDto> Endereco { get; set; }
    }
}
