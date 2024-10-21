import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { TranslateService } from '@ngx-translate/core'; // Importar TranslateService
import { TranslateHttpLoader } from '@ngx-translate/http-loader'; // Importar TranslateHttpLoader

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  public usuario: Usuario;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  idiomaUsado: string = 'es'; // Idioma por defecto en código de idioma

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private alertController: AlertController, // Importamos AlertController
    private translate: TranslateService // Inyectar TranslateService
  ) {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(activatedRoute, router);
    this.usuario.cuenta = '';
    this.usuario.password = '';

    // Establecer el idioma por defecto
    this.translate.setDefaultLang(this.idiomaUsado);
    this.translate.use(this.idiomaUsado); // Usar el idioma por defecto
  }

  // Función para ingresar y validar usuario
  ingresar() {
    const error = this.usuario.validarUsuario();
    if (error) {
      this.mostrarMensajeEmergente(error);
      return;
    }
    this.mostrarMensajeEmergente(this.translate.instant('WELCOME_MESSAGE'));
    this.usuario.navegarEnviandousuario(this.router, '/tabs');
  }

  // Mostrar mensajes emergentes
  async mostrarMensajeEmergente(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion ? duracion : 2000
    });
    toast.present();
  }

  // Alternar visibilidad de contraseña
  togglePasswordVisibility(): void {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off';
    }
  }

  // Función para abrir el AlertController y seleccionar un idioma
  async seleccionarIdioma() {
    const alert = await this.alertController.create({
      header: 'Seleccionar Idioma',
      inputs: [
        {
          name: 'espanol',
          type: 'radio',
          label: 'Español',
          value: 'es',
          checked: this.idiomaUsado === 'es' // Dinámicamente marcamos el idioma seleccionado
        },
        {
          name: 'ingles',
          type: 'radio',
          label: 'Inglés',
          value: 'en',
          checked: this.idiomaUsado === 'en' // Igual para Inglés
        },
        {
          name: 'frances',
          type: 'radio',
          label: 'Francés',
          value: 'fr',
          checked: this.idiomaUsado === 'fr' // Igual para Francés
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Selección de idioma cancelada');
          }
        },
        {
          text: 'Aceptar',
          handler: (data: string) => {
            this.idiomaUsado = data;
            this.translate.use(data); // Cambiar el idioma en ngx-translate
            this.mostrarMensajeEmergente(this.translate.instant('LANGUAGE_CHANGED', { lang: data }));
          }
        }
      ]
    });

    await alert.present();
  }

  // Función para redirigir a la página de temas
  irAPaginaTemas() {
    this.router.navigate(['/temas']);
  }
}
