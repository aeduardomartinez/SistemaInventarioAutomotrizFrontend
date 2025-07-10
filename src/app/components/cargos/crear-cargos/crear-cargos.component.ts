import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { Cargo } from '../../../models/cargo';
import { CargoService } from '../../../services/cargo-back.service';
@Component({
  selector: 'app-crear-cargos',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './crear-cargos.component.html',
  styleUrl: './crear-cargos.component.css'
})
export class CrearCargosComponent {

  cargo: Cargo = {
    id: 0,
    nombre: '',
    mensaje: ''
  };
  mensajeError: string = '';
  mensajeAprobado: string = '';
  cargos: Cargo[] = [];
  constructor(
    private cargoService: CargoService,
    public router: Router,) { }

  ngOnInit(): void {

    this.cargoService.listar().subscribe({
      next: (data) => {
        this.cargos = data;
      },
      error: (err) => {
        console.error('Error al obtener los cargos:', err);
      }
    });
  }


  registrar() {
    this.mensajeError = '';
    this.cargoService.crearCargo(this.cargo).subscribe({
      next: (resp) => {
        this.mensajeAprobado = resp.mensaje;
        console.log(resp);
        this.mensajeError = '';

        setTimeout(() => {
          this.mensajeAprobado = '';
          this.router.navigate(['/']);
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

