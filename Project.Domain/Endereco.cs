using Project.Domain.Identity;

namespace Project.Domain
{
    public class Endereco
    {
        public int EnderecoId { get; set; }
        public string Logradouro { get; set; }
        public TipoEnderecoEnum TipoEndereco { get; set;}
        public string Bairro { get; set; }
        public int Cep { get; set; }
        public string Cidade { get; set; }
        public int ClienteId {get; set;}
        public Cliente Cliente {get;}
        
    }
    public enum TipoEnderecoEnum
    {
        Residencial = 1,
        Comercial = 2
    }
}