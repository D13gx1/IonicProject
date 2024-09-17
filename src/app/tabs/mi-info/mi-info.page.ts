import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-mi-info',
  templateUrl: './mi-info.page.html',
  styleUrls: ['./mi-info.page.scss'],
})
export class MiInfoPage implements OnInit {
  
  usuario: Usuario | undefined;

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
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

