import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  isDarkMode: boolean = false;

  constructor() { }

  ngOnInit() {
    // Comprobar el estado guardado del modo oscuro
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Cambiar a false inicialmente, solo usar la preferencia del usuario si existe
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode === 'true') {
      this.isDarkMode = true; // Usar la preferencia guardada
    } else if (storedDarkMode === 'false') {
      this.isDarkMode = false; // Usar la preferencia guardada
    } else {
      this.isDarkMode = prefersDark; // Usar la preferencia del sistema si no hay nada guardado
    }

    this.setDarkMode(this.isDarkMode);
  }

  // Función para alternar entre el modo oscuro y claro
  toggleDarkMode(event: any) {
    this.isDarkMode = event.detail.checked;
    this.setDarkMode(this.isDarkMode);
  }

  // Función que cambia la clase en el body para modo oscuro y guarda el estado en localStorage
  setDarkMode(activate: boolean) {
    if (activate) {
      document.body.classList.add('dark'); // Activar modo oscuro
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark'); // Desactivar modo oscuro
      localStorage.setItem('darkMode', 'false');
    }
  }
}
