import { Injectable } from '@angular/core';
import { HttpClient,} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endereco } from '../_modules/Endereco';
@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  baseUrl = 'https://localhost:5001/endereco';
  constructor(private http: HttpClient) {}

  getEnderecoById(id: number): Observable<Endereco> {
    return this.http.get<Endereco>(`${this.baseUrl}/${id}`);
  }
  postEndereco(endereco: Endereco) {
    return this.http.post(`${this.baseUrl}`, endereco);
  }
  putEndereco(endereco: Endereco) {
    return this.http.put(`${this.baseUrl}/${endereco.enderecoId}`, endereco);
  }
  deleteEndereco(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
