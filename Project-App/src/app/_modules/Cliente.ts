import { Endereco } from './Endereco';

export class Cliente {
    clienteId: number;
    nomeCliente: string;
    email: string;
    numeroTelefone: any;
    cpf: any;
    cnpj: any;
    tipoCliente: any;
    userId: string;
    enderecoId: number;
    endereco: Endereco[];
}