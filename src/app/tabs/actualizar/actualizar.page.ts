import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../model/usuario';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.page.html',
  styleUrls: ['./actualizar.page.scss'],
})
export class ActualizarPage implements OnInit {
  usuario: Usuario = new Usuario();
  nivelesEducacionales: NivelEducacional[] = [];

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Cargar niveles educacionales
    this.nivelesEducacionales = [
      NivelEducacional.buscarNivelEducacional(5)!,
      NivelEducacional.buscarNivelEducacional(6)!
    ];

    // Obtener los datos del usuario desde el estado de navegación
    const nav = this.router.getCurrentNavigation();
    if (nav && nav.extras && nav.extras.state) {
      const cuenta = nav.extras.state['cuenta'];
      const password = nav.extras.state['password'];
      const usuarioEncontrado = Usuario.buscarUsuarioValido(cuenta, password);
      if (usuarioEncontrado) {
        this.usuario = usuarioEncontrado;  // Asignar el usuario encontrado
      }
    }
  }

  async actualizarUsuario() {
    // Lógica para guardar los cambios del usuario
    const alert = await this.alertController.create({
      header: 'Actualización exitosa',
      message: 'La información del usuario ha sido actualizada correctamente.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/tabs/mi-info']);
          },
        },
      ],
    });
    await alert.present();
  }
}
