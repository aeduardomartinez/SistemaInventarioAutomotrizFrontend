import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MercanciaBackService } from '../../../services/mercancia-back.service';
import { Mercancia } from '../../../models/mercancia';
import { Router, RouterLink } from '@angular/router';

import { UsuarioService } from '../../../services/usuario-back.service';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

import { Usuario } from '../../../models/usuario';
@Component({
  selector: 'app-editar',
  imports: [FormsModule, NgIf, NgFor, RouterLink],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css',
  standalone: true
})
export class EditarComponent implements OnInit {

  mercancia: Mercancia = {
    id: 0,
    nombreProducto: '',
    cantidad: 0,
    fechaIngreso: '',
    idUsuario: 0,
    fechaModificacion: '',
    mensaje: ''
  };

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private mercanciaService: MercanciaBackService,
    private usuarioService: UsuarioService
  ) { }

  idUsuarioModifico: number = 0;
  mensajeError: string = '';
  mensajeAprobado: string = '';
  usuarios: Usuario[] = [];
  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mercanciaService.obtenerPorId(+id).subscribe({
        next: (data) => {
          this.mercancia = data;
        },
        error: (err) => {
          console.error('Error al obtener la mercancía', err);
        }
      });
    }

    this.usuarioService.listar().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
  }



  guardarCambios() {
    if (!this.idUsuarioModifico) {
      alert('Debe seleccionar el usuario que modifica.');
      return;
    }

    const payload = {
      ...this.mercancia,
      idUsuarioModifico: this.idUsuarioModifico
    };

    this.mercanciaService.editar(payload).subscribe({
      next: (resp) => {
        this.mensajeAprobado = resp.mensaje;
        console.log(resp);
        this.mensajeError = '';

        setTimeout(() => {
          this.mensajeAprobado = '';
          this.router.navigate(['/listar']);
        }, 1000);

      },
      error: (err) => {
        this.mensajeError = err.mensaje;
        console.log(err);
        this.mensajeError = '';

        setTimeout(() => {
          this.mensajeError = '';
        }, 5000);
      }
    });
  }

  soloEnteros(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}
