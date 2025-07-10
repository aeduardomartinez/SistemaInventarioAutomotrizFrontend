import { Component, OnInit } from '@angular/core';

import { Mercancia } from '../../../models/mercancia';
import { MercanciaBackService } from '../../../services/mercancia-back.service';
import { Usuario } from '../../../models/usuario';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario-back.service';
import { NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  mercancia: Mercancia = {
    nombreProducto: '',
    cantidad: 0,
    fechaIngreso: '',
    fechaModificacion: '',
    idUsuario: 0,
    mensaje: ''
  };
  fechaMaxima: string = '';
  usuarios: Usuario[] = [];
  mensajeError: string = '';
  mensajeAprobado: string = '';
  constructor(
    private mercanciaService: MercanciaBackService,
    private usuarioService: UsuarioService,
    public router: Router,) { }

  ngOnInit(): void {

    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = (hoy.getMonth() + 1).toString().padStart(2, '0');
    const dia = hoy.getDate().toString().padStart(2, '0');
    this.fechaMaxima = `${año}-${mes}-${dia}`;
    this.usuarioService.listar().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
  }


  registrar() {
    this.mensajeError = '';
    this.mercanciaService.crear(this.mercancia).subscribe({
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
        this.mensajeError = err.error?.message || 'Error al registrar mercancía';
        console.error(err);
        this.mensajeAprobado = '';
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
