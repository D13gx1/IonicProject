import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario'; // Asegúrate de la ruta correcta

@Component({
  selector: 'app-mi-info',
  templateUrl: './mi-info.page.html',
  styleUrls: ['./mi-info.page.scss'],
})
export class MiInfoPage implements OnInit {
  public usuario: Usuario | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.recibirUsuario();
  }

  recibirUsuario() {
    const nav = this.router.getCurrentNavigation();
    if (nav && nav.extras.state) {
      this.usuario = nav.extras.state['usuario'];
      console.log('Usuario recibido:', this.usuario); // Verifica si se recibe correctamente
    } else {
      this.router.navigate(['/login']);
    }
  }
}
