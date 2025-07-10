import { Usuario } from "./usuario";
export interface Mercancia {
  id?: number;
  nombreProducto: string;
  cantidad: number;
  fechaIngreso: string;
  idUsuario: number;
  usuarioRegistro?: Usuario;
  usuarioModifico?: Usuario;
  fechaModificacion?: string;
  mensaje: string;
}
