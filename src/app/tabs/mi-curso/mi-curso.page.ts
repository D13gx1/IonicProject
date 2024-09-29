import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Asegúrate de que esta línea esté presente

@Component({
  selector: 'app-mi-curso',
  templateUrl: './mi-curso.page.html',
  styleUrls: ['./mi-curso.page.scss'],
})
export class MiCursoPage implements OnInit {
  public sede: string | undefined;
  public idAsignatura: string | undefined;
  public seccion: string | undefined;
  public nombreAsignatura: string | undefined;
  public nombreProfesor: string | undefined;
  public dia: string | undefined;
  public horaInicio: string | undefined;
  public horaFin: string | undefined;
  public bloqueInicio: number | undefined;
  public bloqueTermino: number | undefined;

  constructor(private router: Router) {} // Aquí inyectas el Router

  ngOnInit() {
    // Recuperar datos del estado del enrutador
    const navigation = window.history.state;
    this.sede = navigation.sede;
    this.idAsignatura = navigation.idAsignatura;
    this.seccion = navigation.seccion;
    this.nombreAsignatura = navigation.nombreAsignatura;
    this.nombreProfesor = navigation.nombreProfesor;
    this.dia = navigation.dia;
    this.horaInicio = navigation.horaInicio;
    this.horaFin = navigation.horaFin;
    this.bloqueInicio = navigation.bloqueInicio;
    this.bloqueTermino = navigation.bloqueTermino;
  }

  regresarInicio() {
    this.router.navigate(['/tabs/inicio']); // Esta línea debe funcionar correctamente
  }
}
