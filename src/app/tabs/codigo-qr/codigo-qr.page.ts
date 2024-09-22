import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import jsQR from 'jsqr';

@Component({
  selector: 'app-codigo-qr',
  templateUrl: './codigo-qr.page.html',
  styleUrls: ['./codigo-qr.page.scss'],
})
export class CodigoQrPage implements OnInit {

  @ViewChild('fileinput', { static: false }) private fileinput!: ElementRef;
  @ViewChild('video', { static: false }) private video!: ElementRef;
  @ViewChild('canvas', { static: false }) private canvas!: ElementRef;

  public escaneando = false;
  public datosQR = '';
  public loading: HTMLIonLoadingElement | null = null;

  // Variables para almacenar los datos del QR
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

  constructor(private loadingController: LoadingController, private alertController: AlertController, private router: Router) {}

  ngOnInit() {}

  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Confirmar salida',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Salir',
          handler: () => {
            this.logout();
          }
        }
      ]
    });
    await alert.present();
  }

  logout() {
    this.router.navigate(['/login']);
  }

  public obtenerDatosQr(source?: CanvasImageSource): boolean {
    let w = 0;
    let h = 0;
    if (!source) {
      this.canvas.nativeElement.width = this.video.nativeElement.videoWidth;
      this.canvas.nativeElement.height = this.video.nativeElement.videoHeight;
    }
    w = this.canvas.nativeElement.width;
    h = this.canvas.nativeElement.height;

    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(source ? source : this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    const qrCode = jsQR(img.data, img.width, img.height, { inversionAttempts: 'dontInvert' });
    
    if (qrCode) {
      this.escaneando = false;
      this.datosQR = qrCode.data;
      this.mostrarDatosQROrdenados(this.datosQR);  // Llama a la función para organizar los datos
    }

    return this.datosQR !== '';
  }

  public cargarImagenDesdeArchivo(): void {
    this.fileinput.nativeElement.click();
  }

  public verificarArchivoConQr(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      const img = new Image();
      img.onload = () => {
        this.obtenerDatosQr(img);
      };
      img.src = URL.createObjectURL(file);
    }
  }

  public async comenzarEscaneoQR() {
    const mediaProvider = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.loading = await this.loadingController.create({});
    await this.loading.present();
    this.video.nativeElement.play();
    requestAnimationFrame(this.verificarVideo.bind(this));
  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.escaneando = true;
      }
      if (this.obtenerDatosQr()) {
        console.log('datos obtenidos');
      } else {
        if (this.escaneando) {
          console.log('escaneando...');
          requestAnimationFrame(this.verificarVideo.bind(this));
        }
      }
    } else {
      console.log('video aún no tiene datos');
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }

  public limpiarDatos(): void {
    this.escaneando = false;
    this.datosQR = '';
    this.loading = null;
    (document.getElementById('input-file') as HTMLInputElement).value = '';
  }

  public mostrarDatosQROrdenados(datosQR: string): void {
    const objetoDatosQR = JSON.parse(datosQR);
    this.sede = objetoDatosQR.sede;
    this.idAsignatura = objetoDatosQR.idAsignatura;
    this.seccion = objetoDatosQR.seccion;
    this.nombreAsignatura = objetoDatosQR.nombreAsignatura;
    this.nombreProfesor = objetoDatosQR.nombreProfesor;
    this.dia = objetoDatosQR.dia;
    this.horaInicio = objetoDatosQR.horaInicio;
    this.horaFin = objetoDatosQR.horaFin;
    this.bloqueInicio = objetoDatosQR.bloqueInicio;
    this.bloqueTermino = objetoDatosQR.bloqueTermino;
  }
}
