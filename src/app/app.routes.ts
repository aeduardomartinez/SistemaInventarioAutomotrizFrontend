import { Routes } from '@angular/router';
import { CrearComponent } from './components/mercancia/crear/crear.component';
import { ListarComponent } from './components/mercancia/listar/listar.component';
import { Component } from '@angular/core';
import { EditarComponent } from './components/mercancia/editar/editar.component';
import { EliminarComponent } from './components/mercancia/eliminar/eliminar.component';
import { InicioComponent } from './inicio/inicio.component';
import { AgregarComponent } from './components/usuario/agregar/agregar.component';
import { CrearCargosComponent } from './components/cargos/crear-cargos/crear-cargos.component';

export const routes: Routes = [

  { path: 'crear', component: CrearComponent },
  { path: 'listar', component: ListarComponent },
  { path: 'mercancia/editar/:id', component: EditarComponent },
  { path: 'mercancia/eliminar/:id/:idUsuario', component: EliminarComponent },
  { path: '', component: InicioComponent },
  { path: 'agregar', component: AgregarComponent },
  { path: 'cargos', component: CrearCargosComponent }

];
