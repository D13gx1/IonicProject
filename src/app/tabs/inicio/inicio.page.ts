import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular'; // Asegúrate de importar AnimationController
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
export class InicioPage implements OnInit, AfterViewInit {

  usuario: Usuario | undefined;
  isVisible: boolean = false;
  itemTitulo: any; // Asegúrate de que esto esté correctamente tipado

  constructor(
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController // Cambia 'any' a 'AnimationController'
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

  ngAfterViewInit(): void {
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(6000)
        .fromTo('transform', 'translate(0%)', 'translate(100%)')
        .fromTo('opacity', 0.2, 1);

      animation.play();
    }
    this.createPageTurnAnimation();
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

  // Asegúrate de implementar esta función
  createPageTurnAnimation() {
    // Lógica de animación de cambio de página
  }
}
