import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario-back.service';
import { Usuario } from '../../../models/usuario';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Cargo } from '../../../models/cargo';
import { CargoService } from '../../../services/cargo-back.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-agregar',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  usuario: Usuario = {
    id: 0,
    nombre: '',
    edad: 0,
    fechaIngreso: '',
    idCargo: 0,
    mensaje: ''
  };

  cargo: Cargo = {
    id: 0,
    nombre: '',
    mensaje: ''
  }
  mensajeError: string = '';
  mensajeAprobado: string = '';
  cargos: Cargo[] = [];

  ngOnInit(): void {

    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = (hoy.getMonth() + 1).toString().padStart(2, '0');
    const dia = hoy.getDate().toString().padStart(2, '0');
    this.fechaMaxima = `${año}-${mes}-${dia}`;
    this.cargoService.listar().subscribe({

      next: (data) => {
        console.log('Cargos recibidos:', data);
        this.cargos = data;
      },
      error: (err) => {
        console.error('Error al obtener cargos:', err);
      }
    });
  }
  mensaje: string = '';
  fechaMaxima: string = '';
  constructor(private usuarioService: UsuarioService, private cargoService: CargoService, private router: Router) { }

  registrarUsuario() {

    this.usuarioService.crearUsuario(this.usuario).subscribe({
      next: (resp) => {

        this.mensajeAprobado = resp.mensaje;
        setTimeout(() => {
          this.mensajeAprobado = '';
          this.router.navigate(['/listar']);
        }, 1000);
      },
      error: (err) => {
        this.mensaje = 'Error al registrar usuario';
        console.error(err);
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
