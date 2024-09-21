import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import jsQR, { QRCode } from 'jsqr';
import { Asistencia } from 'src/app/model/asistencia';

@Component({
  selector: 'app-mi-info',
  templateUrl: './mi-info.page.html',
  styleUrls: ['./mi-info.page.scss'],
})
export class MiInfoPage implements OnInit {

  @ViewChild('fileinput', {static: false}) private fileinput!: ElementRef;
  @ViewChild('video', {static: false}) private video!: ElementRef;
  @ViewChild('canvas', {static: false}) private canvas!: ElementRef;

  public escaneando = false;
  public datosQR = '';
  public loading : HTMLIonLoadingElement | null = null;

  constructor(private loadingController: LoadingController) { }

  ngOnInit() {
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
    }

    return this.datosQR !== '';
  }

  public cargarImagenDesdeArchivo(): void {
    this.fileinput.nativeElement.click();
  }

  public verificarArchivoConQr(event: Event): void {
    const input = event.target as HTMLInputElement;  // Asegura que el target es un input
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];  // Accede al primer archivo
      const img = new Image();
      img.onload = () => {
        this.obtenerDatosQr(img);
      };
      img.src = URL.createObjectURL(file);  // Carga la imagen
    }
  }

  public  async comenzarEscaneoQR(){
    // this.limpiarDatos
    const mediaProvider: MediaProvider =await navigator.mediaDevices.getUserMedia({
      video:{facingMode:'enviroment'}
    })
    this.video.nativeElement.srcObject =mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.loading = await this.loadingController.create({});
    await this.loading.present();
    this.video.nativeElement.play();
    requestAnimationFrame(this.verificarVideo.bind(this));
  }
  async verificarVideo(){
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA){
      if (this.loading){
        await this.loading.dismiss();
        this.loading = null;
        this.escaneando =true;
      }
      if(this.obtenerDatosQr()){
        console.log('datos obtenidos');
      } else {
        if(this.escaneando){
          console.log('escaneando...');
          requestAnimationFrame(this.verificarVideo.bind(this));
        }
      }
    } else {console.log('video aún no tiene datos');
       requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }
  
  public detenerEscaneoQR():void{
    this.escaneando = false;
  }

  public limpiarDatos():void{
    this.escaneando=false;
    this.datosQR='';
    this.loading=null;
    (document.getElementById('input-file')as HTMLInputElement).value='';
  }

}