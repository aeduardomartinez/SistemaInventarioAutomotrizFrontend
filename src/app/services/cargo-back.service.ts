import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Cargo } from '../models/cargo';

@Injectable({ providedIn: 'root' })
export class CargoService {
  private url = 'http://localhost:8080/cargo';

  constructor(private http: HttpClient) { }

  listar(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.url);
  }
  crearCargo(cargo: Cargo): Observable<Cargo> {
    return this.http.post<Cargo>(`${this.url}/registrar`, cargo);
  }
}
