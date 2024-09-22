//src>app>tabs>tabs.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  usuario: Usuario|undefined = undefined
  constructor(private readonly router: Router) { }

  ngOnInit() {
    // Obtener el estado de la navegación para recuperar los datos del usuario
    const nav = this.router.getCurrentNavigation();
    if (nav && nav.extras && nav.extras.state) {
      const cuenta = nav.extras.state['cuenta'];
      const password = nav.extras.state['password'];
      this.usuario = Usuario.buscarUsuarioValido(cuenta, password);
     
    }

  }

  irAMiInfo(){
    this.usuario?.navegarEnviandousuario(this.router,"/tabs/mi-info")
  }
}
