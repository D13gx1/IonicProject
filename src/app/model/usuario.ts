import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NivelEducacional } from './nivel-educacional';
import { Persona } from "./persona";

export class Usuario extends Persona {

  public cuenta: string;
  public correo: string;
  public password: string;
  public preguntaSecreta: string;
  public respuestaSecreta: string;
  public fotoUrl: string; // Nuevo atributo para la foto del perfil

  constructor() {
    super();
    this.cuenta = '';
    this.correo = '';
    this.password = '';
    this.preguntaSecreta = '';
    this.respuestaSecreta = '';
    this.nombre = '';
    this.apellido = '';
    this.fotoUrl = ''; // Inicializar el nuevo atributo
    this.nivelEducacional = NivelEducacional.buscarNivelEducacional(1)!;
    this.fechaNacimiento = undefined;
  }
  
  public static getNewUsuario(
    cuenta: string,
    correo: string,
    password: string,
    preguntaSecreta: string,
    respuestaSecreta: string,
    nombre: string,
    apellido: string,
    nivelEducacional: NivelEducacional,
    fechaNacimiento: Date | undefined,
    fotoUrl: string // Añadir parámetro para la foto
  ) {
    let usuario = new Usuario();
    usuario.cuenta = cuenta;
    usuario.correo = correo;
    usuario.password = password;
    usuario.preguntaSecreta = preguntaSecreta;
    usuario.respuestaSecreta = respuestaSecreta;
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.nivelEducacional = nivelEducacional;
    usuario.fechaNacimiento = fechaNacimiento;
    usuario.fotoUrl = fotoUrl; // Asignar la foto
    return usuario;
  }

  public static buscarUsuarioValido(cuenta: string, password: string): Usuario | undefined {
    return Usuario.getListaUsuarios().find(
      usu => usu.cuenta === cuenta && usu.password === password);
  }

  public validarCuenta(): string {
    if (this.cuenta.trim() === '') {
      return 'Para ingresar al sistema debe seleccionar una cuenta.';
    }
    return '';
  }

  public validarPassword(): string {
    if (this.password.trim() === '') {
      return 'Para ingresar al sistema debe escribir la contraseña.';
    }
    for (let i = 0; i < this.password.length; i++) {
      if ('0123456789'.indexOf(this.password.charAt(i)) === -1) {
        return 'La contraseña debe ser numérica.';
      }
    }
    if (this.password.length !== 4) {
      return 'La contraseña debe ser numérica de 4 dígitos.';
    }
    return '';
  }

  public validarUsuario(): string {
    let error = this.validarCuenta();
    if (error) return error;
    error = this.validarPassword();
    if (error) return error;
    const usu = Usuario.buscarUsuarioValido(this.cuenta, this.password);
    if (!usu) return 'Las credenciales del usuario son incorrectas.';
    return '';
  }

  public override toString(): string {
    return `${this.cuenta}
      ${this.correo}
      ${this.password}
      ${this.preguntaSecreta}
      ${this.respuestaSecreta}
      ${this.nombre}
      ${this.apellido}
      ${this.nivelEducacional.getEducacion()}
      ${this.getFechaNacimiento()}`;
  }

  
  public static getListaUsuarios(): Usuario[] {
    return Usuario.listaUsuarios;
  }

  public static setListaUsuarios(usuarios: Usuario[]): void {
    Usuario.listaUsuarios = usuarios;
  }

  public static guardarUsuario(usuario: Usuario): void {
    const index = Usuario.listaUsuarios.findIndex(u => u.cuenta === usuario.cuenta);
    if (index !== -1) {
      // Update existing user
      Usuario.listaUsuarios[index] = usuario;
    } else {
      // Add new user
      Usuario.listaUsuarios.push(usuario);
    }
    // Optionally, save to localStorage for persistence
    localStorage.setItem('usuarios', JSON.stringify(Usuario.listaUsuarios));
  }

  public static cargarUsuarios(): void {
    const usuariosGuardados = localStorage.getItem('usuarios');
    if (usuariosGuardados) {
      Usuario.listaUsuarios = JSON.parse(usuariosGuardados).map((u: any) => {
        const usuario = new Usuario();
        Object.assign(usuario, u);
        usuario.nivelEducacional = NivelEducacional.buscarNivelEducacional(u.nivelEducacional.codigo)!;
        usuario.fechaNacimiento = u.fechaNacimiento ? new Date(u.fechaNacimiento) : undefined;
        return usuario;
      });}}
  recibirUsuario(activatedRoute: ActivatedRoute, router: Router) {
    activatedRoute.queryParams.subscribe(() => {
      const nav = router.getCurrentNavigation();
      if(nav) {
        if (nav.extras.state) {
          const cuenta = nav.extras.state['cuenta'];
          const password = nav.extras.state['password'];
          const usu = Usuario.buscarUsuarioValido(cuenta,password);
          this.cuenta = usu!.cuenta;
          this.password = usu!.password;
          this.correo = usu!.correo;
          this.preguntaSecreta = usu!.preguntaSecreta;
          this.respuestaSecreta = usu!.respuestaSecreta;
          this.nombre = usu!.nombre;
          this.apellido = usu!.apellido;
          this.nivelEducacional = usu!.nivelEducacional;
          this.fechaNacimiento = usu!.fechaNacimiento;
          this.fotoUrl = usu!.fotoUrl;  // Asignar la foto
          return;
        }
      }
      router.navigate(['/login']);
    })
  }

  public navegarEnviandousuario(router: Router, pagina: string) {
    // Define las propiedades que quieres pasar como estado
    const navigationExtras: NavigationExtras = {
        state: {
            cuenta: this.cuenta,
            password: this.password
        }
    };
    
    // Navega a la página especificada con los extras de navegación
    router.navigate([pagina], navigationExtras);
  }
  private static listaUsuarios: Usuario[] = [
    Usuario.getNewUsuario(
      'atorres',
      'atorres@duocuc.cl',
      '1234',
      '¿Cuál es tu animal favorito?',
      'gato',
      'Ana',
      'Torres',
      NivelEducacional.buscarNivelEducacional(6)!,
      new Date(2000, 0, 1),
      '../../assets/img/Robocop.jpg'
    ),
    Usuario.getNewUsuario(
      'chimuelo',
      'chimuelo123@duocuc.cl',
      '1234',
      '¿Cuál es tu postre favorito?',
      'panqueques',
      'Chimuelo', 
      'Alejandro',
      NivelEducacional.buscarNivelEducacional(5)!,
      new Date(2008, 10, 5),
      '../../assets/img/Chimuelo.jpg'  // Foto de ejemplo
    ),
    Usuario.getNewUsuario(
      'cmujica',
      'cmujica@duocuc.cl',
      '4321',
      '¿Cuál es tu vehículo favorito?',
      'moto',
      'Carla',
      'Mujica',
      NivelEducacional.buscarNivelEducacional(6)!,
      new Date(2000, 2, 1),
      '../../assets/img/abed.jpg'  // Foto de ejemplo
    ),
  ];
}
