import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario';  // Importar la clase Usuario desde el modelo
import { AlertController } from '@ionic/angular';  // Importar el controlador de alertas de Ionic
import { Router } from '@angular/router';  // Importar el servicio Router para la navegación

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  cuenta: string = '';  // Almacena el nombre de la cuenta ingresada por el usuario
  preguntaSecreta: string = '';  // Almacena la pregunta secreta del usuario encontrado
  respuestaSecreta: string = '';  // Almacena la respuesta secreta ingresada por el usuario
  usuario: Usuario | undefined;  // Variable para almacenar el usuario encontrado

  constructor(
    private alertController: AlertController,
    private router: Router  // Inyectar el Router para navegar entre páginas
  ) { }

  ngOnInit() {
    // Se ejecuta al iniciar la página
  }

  // Método para buscar la pregunta secreta de la cuenta ingresada
  buscarPreguntaSecreta() {
    // Busca al usuario por la cuenta ingresada
    this.usuario = Usuario.getListaUsuarios().find(usu => usu.cuenta === this.cuenta);

    // Si se encuentra el usuario, se asigna su pregunta secreta
    if (this.usuario) {
      this.preguntaSecreta = this.usuario.preguntaSecreta;
    } else {
      // Si no se encuentra el usuario, se muestra un mensaje de alerta
      this.preguntaSecreta = '';
      this.presentAlert('Usuario no encontrado', 'La cuenta ingresada no existe.');
    }
  }

  // Método para verificar si la respuesta secreta ingresada es correcta
  verificarRespuestaSecreta() {
    // Verificar si el campo de respuesta secreta está vacío
    if (!this.respuestaSecreta) {
      this.presentAlert('Error', 'Por favor, ingresa tu respuesta secreta.');
      return;  // Termina el método si el campo está vacío
    }
  
    if (this.usuario && this.respuestaSecreta === this.usuario.respuestaSecreta) {
      // Si la respuesta secreta es correcta, redirigir a la página de correcto con la contraseña
      this.router.navigate(['/correcto'], {
        state: { password: this.usuario.password }
      });
    } else {
      // Si la respuesta secreta es incorrecta, redirigir a la página de incorrecto
      this.router.navigate(['/incorrecto']);
    }
  }



  // Método para mostrar un alerta con un mensaje personalizado (en caso de necesitarlo)
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Método que se ejecuta al salir de la página para reiniciar los valores
  ionViewWillLeave() {
    this.cuenta = '';
    this.preguntaSecreta = '';
    this.respuestaSecreta = '';
    this.usuario = undefined;
  }
}
