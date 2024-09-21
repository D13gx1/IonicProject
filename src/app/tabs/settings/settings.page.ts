// src/app/tabs/settings/settings.page.ts
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
    this.isDarkMode = localStorage.getItem('darkMode') === 'true' || prefersDark;
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
