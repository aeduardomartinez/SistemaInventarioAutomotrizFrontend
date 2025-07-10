import { Component, OnInit } from '@angular/core';
import { Mercancia } from '../../../models/mercancia';
import { Usuario } from '../../../models/usuario';
import { MercanciaBackService } from '../../../services/mercancia-back.service';
import { UsuarioService } from '../../../services/usuario-back.service';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, RouterLink],
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {
  usuarios: Usuario[] = [];
  mercancias: Mercancia[] = [];
  mercancia?: Mercancia;
  idUsuarioSeleccionado: number = 0;
  idMercanciaSeleccionada: number = 0;
  mensajeError: string = '';
  mensajeExito: string = '';

  constructor(
    private mercanciaService: MercanciaBackService,
    private usuarioService: UsuarioService, private router: Router, private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idMercanciaSeleccionada = Number(id);

      this.mercanciaService.obtenerPorId(this.idMercanciaSeleccionada).subscribe({
        next: (mercancia) => this.mercancia = mercancia,
        error: (err) => {
          console.error('Error al obtener mercancía', err);
          this.mensajeError = 'No se pudo cargar la mercancía';
        }
      });
    } else {
      this.mensajeError = 'ID de mercancía no proporcionado.';
    }

    this.usuarioService.listar().subscribe({
      next: (usuarios) => this.usuarios = usuarios,
      error: (err) => console.error('Error al obtener usuarios', err)
    });
  }


  eliminar(): void {
    if (this.idUsuarioSeleccionado && this.idMercanciaSeleccionada) {
      if (confirm('¿Estás seguro de eliminar esta mercancía?')) {
        this.mercanciaService.eliminar(this.idMercanciaSeleccionada, this.idUsuarioSeleccionado)
          .subscribe({
            next: (resp) => {
              this.mensajeExito = resp.mensaje || 'Mercancía eliminada correctamente';
              this.mensajeError = '';
              setTimeout(() => {
                this.router.navigate(['/listar']);
                this.mensajeError = '';
              }, 1000);

            },
            error: (err) => {
              this.mensajeError = err.error?.message || 'Error al eliminar mercancía';
              this.mensajeExito = '';
              setTimeout(() => {
                this.mensajeError = '';
              }, 5000);
            }
          });
      }
    } else {
      this.mensajeError = 'Debe seleccionar un usuario y una mercancía';
      this.mensajeExito = '';
    }
  }
}
