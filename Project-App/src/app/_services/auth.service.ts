import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { User } from '../_modules/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  baseUrl = 'https://localhost:5001/user/';
  getAllUser = 'getAllUser';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http
    .post(`${this.baseUrl}login`,model).pipe(
      map((response: any) => {
        const user = response;
        if(user) {
          localStorage.setItem('token',user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          sessionStorage.setItem('username',this.decodedToken.unique_name);
          sessionStorage.setItem('id',this.decodedToken.nameid)

        }
      })
    );
  }
  register(model: any) {
    return this.http.post(`${this.baseUrl}register`,model)
  }
  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  postUsuario(usuario: User) {
    return this.http.post(`${this.baseUrl}`, usuario);
  }
  putUsuario(usuario: User) {
    return this.http.put(`${this.baseUrl}${usuario.id}`, usuario);
  }
  deleteUsuario(id: number) {
    return this.http.delete(`${this.baseUrl}${id}`);
  }
  getAllUsuario(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}${this.getAllUser}`);
  }
  getUsuarioById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}${id}`);
  }
}
