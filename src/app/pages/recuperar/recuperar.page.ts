import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  cuenta: string = '';  // Para almacenar el nombre de la cuenta
  preguntaSecreta: string = '';  // Para almacenar la pregunta secreta del usuario
  respuestaSecreta: string = '';  // Para almacenar la respuesta secreta
  usuario: Usuario | undefined;  // Para almacenar el usuario encontrado

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  // Método para buscar la pregunta secreta del usuario
  buscarPreguntaSecreta() {
    this.usuario = Usuario.getListaUsuarios().find(usu => usu.cuenta === this.cuenta);
    
    if (this.usuario) {
      this.preguntaSecreta = this.usuario.preguntaSecreta;
    } else {
      this.preguntaSecreta = '';
      this.presentAlert('Usuario no encontrado', 'La cuenta ingresada no existe.');
    }
  }

  // Método para verificar si la respuesta secreta es correcta
  verificarRespuestaSecreta() {
    if (this.usuario && this.respuestaSecreta === this.usuario.respuestaSecreta) {
      this.presentAlert('Verificación Exitosa', 
        `La respuesta secreta es correcta. Tu contraseña es: ${this.usuario.password}`);
    } else {
      this.presentAlert('Error', 'La respuesta secreta es incorrecta.');
    }
  }
  

  // Método para mostrar un alert
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
