import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  usuario: Usuario | undefined;

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
    }
  }

  // Función para mostrar una ventana de confirmación antes de cerrar sesión
  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Confirmar salida',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel clicked');
          }
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

  // Función para manejar la salida del usuario
  logout() {
    // Aquí puedes añadir la lógica para cerrar sesión, por ejemplo:
    // this.authService.logout();
    // Redirigir al login o a otra página
    this.router.navigate(['/login']);
  }
}
