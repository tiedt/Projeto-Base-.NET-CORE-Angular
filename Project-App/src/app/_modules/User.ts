import { Cliente } from './Cliente';

export class User {
    id: number;
    userName: string;
    email: string;
    password: string;
    fullName: string;
    phoneNumber: any;
    clienteId: number;
    cliente: Cliente[];
}