import { Component } from '@angular/core';
import { Usuario } from '../../model/usuario';

@Component({
  selector: 'app-mi-info',
  templateUrl: './mi-info.page.html', // Asegúrate de que el nombre del archivo sea correcto
  styleUrls: ['./mi-info.page.scss'],
})
export class MiInfoPage {
  public usuario: Usuario | undefined; // Aquí puedes inicializar tu usuario

  constructor() {
    // Lógica de inicialización si es necesaria
  }
}
