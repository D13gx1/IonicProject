import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario';  
import { AlertController } from '@ionic/angular';  
import { Router } from '@angular/router';  

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  cuenta: string = '';  
  preguntaSecreta: string = '';  
  respuestaSecreta: string = '';  
  usuario: Usuario | undefined;  

  constructor(
    private alertController: AlertController,
    private router: Router  
  ) { }

  ngOnInit() {}

  buscarPreguntaSecreta() {
    this.usuario = Usuario.getListaUsuarios().find(usu => usu.cuenta === this.cuenta);

    if (this.usuario) {
      this.preguntaSecreta = this.usuario.preguntaSecreta;
    } else {
      this.preguntaSecreta = '';
      this.presentAlert('Usuario no encontrado', 'La cuenta ingresada no existe.');
    }
  }

  verificarRespuestaSecreta() {
    if (!this.respuestaSecreta) {
      this.presentAlert('Error', 'Por favor, ingresa tu respuesta secreta.');
      return;
    }
  
    if (this.usuario && this.respuestaSecreta === this.usuario.respuestaSecreta) {
      this.router.navigate(['/correcto'], {
        state: { password: this.usuario.password }
      });
    } else {
      this.router.navigate(['/incorrecto']);
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  ionViewWillLeave() {
    this.cuenta = '';
    this.preguntaSecreta = '';
    this.respuestaSecreta = '';
    this.usuario = undefined;
  }
}
