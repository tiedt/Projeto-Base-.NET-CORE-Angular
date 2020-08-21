using System.Collections.Generic;

namespace Project.WebAPI.Dtos
{
    public class EnderecoDto
    {
        public int EnderecoId { get; set; }
        public string Logradouro { get; set; }
        public int TipoEndereco { get; set; }
        public string Bairro { get; set; }
        public int Cep { get; set; }
        public string Cidade { get; set; }
    }
}