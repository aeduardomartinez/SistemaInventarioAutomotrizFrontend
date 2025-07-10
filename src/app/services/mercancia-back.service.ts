import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mercancia } from '../models/mercancia';
@Injectable({
  providedIn: 'root'
})
export class MercanciaBackService {
  private apiUrl = 'http://localhost:8080/api/mercancia';
  constructor(private http: HttpClient) { }

  listar(filtros: any): Observable<Mercancia[]> {
    let params = new HttpParams();
    if (filtros.nombre) params = params.set('nombre', filtros.nombre);
    if (filtros.nombreUsuario) params = params.set('nombreUsuario', filtros.nombreUsuario);
    if (filtros.fechaIngreso) params = params.set('fechaIngreso', filtros.fechaIngreso);
    return this.http.get<Mercancia[]>(`${this.apiUrl}/buscar`, { params });
  }
  crear(mercancia: Mercancia): Observable<Mercancia> {
    return this.http.post<Mercancia>(`${this.apiUrl}/registrar`, mercancia);
  }

  editar(mercancia: Mercancia): Observable<Mercancia> {
    return this.http.put<Mercancia>(`${this.apiUrl}/editar`, mercancia);
  }

  eliminar(idMercancia: number, idUsuario: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar`, {
      params: {
        idMercancia: idMercancia.toString(),
        idUsuario: idUsuario.toString()
      }
    });
  }

  obtenerPorId(id: number): Observable<Mercancia> {
    return this.http.get<Mercancia>(`${this.apiUrl}/con/${id}`);
  }
  obtenerToda() {
    return this.http.get<Mercancia[]>(`${this.apiUrl}/listar-todo`);
  }
}

