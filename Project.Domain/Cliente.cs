using Project.Domain.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Project.Domain
{
   public class Cliente
    {
        public int ClienteId { get; set; }
        public string NomeCliente { get; set; }
        public string Email { get; set; }
        public string NumeroTelefone { get; set; }
        public string CPF { get; set; }
        public string CNPJ { get; set; }
        public string UserId { get; set; }
        public TipoCliente TipoCliente { get; set; }
        public List<Endereco> Endereco { get; set; }
    }
    public enum TipoCliente
    {
        CPF = 1,
        CNPJ = 2
    }
}
