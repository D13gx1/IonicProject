import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  isDarkMode: boolean = false;
  fontSize: number = 1;  // Valor inicial del tamaño de la fuente

  constructor() { }

  ngOnInit() {
    // Obtener las preferencias de modo oscuro y tamaño de letra
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkMode = localStorage.getItem('darkMode') === 'true' || prefersDark;
    this.fontSize = parseFloat(localStorage.getItem('fontSize') || '1');
    this.setDarkMode(this.isDarkMode);
  }

  toggleDarkMode(event: any) {
    this.isDarkMode = event.detail.checked;
    this.setDarkMode(this.isDarkMode);
  }

  setDarkMode(activate: boolean) {
    if (activate) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }

  changeFontSize(event: any) {
    this.fontSize = event.detail.value;
    document.body.style.fontSize = `${this.fontSize}em`;
    localStorage.setItem('fontSize', this.fontSize.toString());
  }
}
