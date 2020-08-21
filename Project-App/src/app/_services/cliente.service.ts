import { Injectable } from '@angular/core';
import { HttpClient,} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../_modules/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  baseUrl = 'https://localhost:5001/cliente';
  constructor(private http: HttpClient) {}

  getAllClienteById(id: string): Observable<Cliente[]>{
    var get = 'GetAllClienteByUserId';
    return this.http.get<Cliente[]>(`${this.baseUrl}/${get}/${id}`);
  }
  getAllClientes(): Observable<Cliente[]> {
      var getAll = 'GetAllCliente';
    return this.http.get<Cliente[]>(`${this.baseUrl}/${getAll}`);
  }
  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/${id}`);
  }

  postCliente(cliente: Cliente) {
    return this.http.post(`${this.baseUrl}`, cliente);
  }
  putCliente(cliente: Cliente) {
    return this.http.put(`${this.baseUrl}/${cliente.clienteId}`, cliente);
  }
  deleteCliente(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
