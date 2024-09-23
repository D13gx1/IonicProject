import { Component } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';

@Component({
  selector: 'app-mi-info',
  templateUrl: './mi-info.page.html', // Asegúrate de que el nombre del archivo sea correcto
  styleUrls: ['./mi-info.page.scss'],
})
export class MiInfoPage {
  usuario: Usuario | undefined;
  isVisible: boolean = false;
  

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Obtener el estado de la navegación para recuperar los datos del usuario
    const nav = this.router.getCurrentNavigation();
    if (nav && nav.extras && nav.extras.state) {
      const cuenta = nav.extras.state['cuenta'];
      const password = nav.extras.state['password'];
      this.usuario = Usuario.buscarUsuarioValido(cuenta, password);
      console.log(this.usuario)
    }
}

async confirmLogout() {
  const alert = await this.alertController.create({
    header: 'Confirmar salida',
    message: '¿Estás seguro de que quieres cerrar sesión?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
      }, {
        text: 'Salir',
        handler: () => {
          this.logout();
        }
      }
    ]
  });
  await alert.present();
}

logout() {
  this.router.navigate(['/login']);
}
}