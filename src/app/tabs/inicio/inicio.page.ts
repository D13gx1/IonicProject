import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  animations: [
    trigger('fadeIn', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(50px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('hidden => visible', [
        animate('1s ease-in-out')
      ])
    ])
  ]
})
export class InicioPage implements OnInit {

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
    }

    // Hacemos visible el contenido después de un pequeño retraso para la animación
    setTimeout(() => {
      this.isVisible = true;
    }, 200);
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
    this.router.navigate(['/login']);
  }
}
