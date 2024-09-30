import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NivelEducacional } from 'src/app/model/nivel-educacional';

@Component({
  selector: 'app-mi-info',
  templateUrl: './mi-info.page.html',
  styleUrls: ['./mi-info.page.scss'],
})
export class MiInfoPage implements OnInit {
  usuario: Usuario;
  nivelesEducacionales = NivelEducacional.getNivelesEducacionales();
  fechaNacimientoString: string = '';

  constructor(
    private alertController: AlertController,
    private router: Router
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    if (nav && nav.extras.state) {
      const cuenta = nav.extras.state['cuenta'];
      const password = nav.extras.state['password'];
      const usuarioEncontrado = Usuario.buscarUsuarioValido(cuenta, password);
      if (usuarioEncontrado) {
        this.usuario = usuarioEncontrado;
        this.inicializarFechaNacimiento();
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  inicializarFechaNacimiento() {
    if (this.usuario.fechaNacimiento) {
      this.fechaNacimientoString = this.formatearFecha(this.usuario.fechaNacimiento);
    }
  }

  formatearFecha(fecha: Date): string {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  actualizarFechaNacimiento() {
    if (this.fechaNacimientoString) {
      const [dia, mes, anio] = this.fechaNacimientoString.split('/');
      this.usuario.fechaNacimiento = new Date(+anio, +mes - 1, +dia);
    }
  }

  guardarCambiosEnModelo() {
    Usuario.guardarUsuario(this.usuario);
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
            this.actualizarFechaNacimiento();
            this.guardarCambiosEnModelo();
            console.log('Datos actualizados', this.usuario);
            this.mostrarMensajeExito();
          },
        },
      ],
    });

    await alert.present();
  }

  async mostrarMensajeExito() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Tus datos han sido actualizados correctamente.',
      buttons: ['OK']
    });

    await alert.present();
  }

  confirmLogout() {
    this.router.navigate(['/login']);
  }
}
