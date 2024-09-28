import { Component } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NivelEducacional } from 'src/app/model/nivel-educacional';

@Component({
  selector: 'app-mi-info',
  templateUrl: './mi-info.page.html',
  styleUrls: ['./mi-info.page.scss'],
})
export class MiInfoPage {
  usuario: Usuario;
  nivelesEducacionales = NivelEducacional.getNivelesEducacionales(); // Utiliza la función correcta para obtener los niveles

  constructor(
    private alertController: AlertController,
    private router: Router
  ) {
    // Inicializar con un usuario por defecto o obtener del servicio.
    this.usuario = Usuario.buscarUsuarioValido('atorres', '1234')!;
  }

  ngOnInit() {
    // Recuperar los datos del usuario desde la navegación o servicio
    const nav = this.router.getCurrentNavigation();
    if (nav && nav.extras.state) {
      const cuenta = nav.extras.state['cuenta'];
      const password = nav.extras.state['password'];
      this.usuario = Usuario.buscarUsuarioValido(cuenta, password)!;
    }
  }

  async actualizarDatos() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas actualizar tus datos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Actualizar',
          handler: () => {
            // Aquí puedes manejar la lógica de actualización, por ejemplo, persistir los cambios en el modelo
            console.log('Datos actualizados', this.usuario);
            // Implementa la lógica para guardar los datos del usuario actualizado
          },
        },
      ],
    });

    await alert.present();
  }

  confirmLogout() {
    this.router.navigate(['/login']);
  }
}
