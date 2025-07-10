import { Component } from '@angular/core';
import { Mercancia } from '../../../models/mercancia';
import { MercanciaBackService } from '../../../services/mercancia-back.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { Usuario } from '../../../models/usuario';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-listar',
  imports: [FormsModule, NgIf, NgFor, RouterLink],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent {

  mercancias: Mercancia[] = [];

  filtros = {
    nombre: '',
    fechaIngreso: '',
    mensaje: '',
    nombreUsuario: ''
  };
  usuarios: Usuario[] = [];
  mensaje: string = '';
  tipoMensaje: 'success' | 'danger' = 'success';
  mensajeError: string = '';
  mensajeAprobado: string = '';

  resultados: [] = [];
  constructor(private mercanciaService: MercanciaBackService,
    private router: Router
  ) { }


  getNombreUsuario(id: any): string {
    const usuario = this.usuarios.find(u => u.id === +id);
    return usuario?.nombre ?? 'Desconocido';
  }

  buscar() {

    this.mercanciaService.listar(this.filtros).subscribe({
      next: (data) => {
        this.mercancias = data;
        if (data.length === 0) {
          this.mensaje = 'No hay resultados para los filtros aplicados.';
        } else {
          this.mensaje = '';
        }
      },
      error: (err) => {
        if (err.status === 400 && err.error?.message) {
          this.mensaje = err.error.message;
          setTimeout(() => {
            this.mensaje = '';
          }, 5000);
        } else {
          this.mensaje = 'Error al buscar mercancías';
        }
        this.resultados = [];
      }
    });
  }

  editar(id: number) {
    this.router.navigate(['mercancia/editar', id]);
  }

  consultarTodo() {
    this.mercanciaService.obtenerToda().subscribe({
      next: (data) => {
        this.mercancias = data;
        if (data.length === 0) {
          this.mensaje = 'No hay mercancías registradas.';
        } else {
          this.mensaje = '';
        }
      },
      error: (err) => {
        this.mensaje = 'Error al obtener toda la mercancía.';
        this.mercancias = [];
      }
    });
  }
}
