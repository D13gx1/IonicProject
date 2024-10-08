import { Component } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  public usuario: Usuario;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  
  constructor(
      private router: Router
    , private activatedRoute: ActivatedRoute
    , private toastController: ToastController) 

  {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(activatedRoute, router);
    this.usuario.cuenta = '';
    this.usuario.password = '';
  }

  ingresar() {
    const error = this.usuario.validarUsuario();
    if(error) {
      this.mostrarMensajeEmergente(error);
      return;
    } 
    this.mostrarMensajeEmergente('¡Bienvenido(a) al Sistema de Asistencia DUOC!');
    this.usuario.navegarEnviandousuario(this.router, '/tabs');
  }

  async mostrarMensajeEmergente(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }

  togglePasswordVisibility(): void {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off';
    }
  }


}
