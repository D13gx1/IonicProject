import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Asistencia } from 'src/app/model/asistencia';
import { Usuario } from 'src/app/model/usuario';
import jsQR, { QRCode } from 'jsqr';

@Component({
  selector: 'app-leerqr',
  templateUrl: './leerqr.page.html',
  styleUrls: ['./leerqr.page.scss'],
})
export class LeerqrPage implements OnInit {

  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;

  public usuario: Usuario;
  public asistencia: Asistencia = new Asistencia();
  public escaneando = false;
  public datosQR: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { 
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(activatedRoute, router);
    
  }

  ngOnInit() {
  }

  public async comenzarEscaneoQR() {
    try {
        const mediaStream: MediaStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
        });
        
        this.video.nativeElement.srcObject = mediaStream;
        this.video.nativeElement.setAttribute('playsinline', 'true');
        this.video.nativeElement.play();
        
        this.escaneando = true; // Corregido el valor booleano
        
        // Asegúrate de que verificarVideo esté correctamente definido y manejado
        requestAnimationFrame(this.verificarVideo.bind(this));
    } catch (error) {
        console.error("Error al acceder a la cámara:", error);
    }
}


  async verificarVideo() {
    if (this.video.nativeElement.readyState 
      === this.video.nativeElement.HAVE_ENOUGH_DATA){
        if (this.obtenerDatosQR() || !this.escaneando) return;
        requestAnimationFrame(this.verificarVideo.bind(this));
      }else {
        requestAnimationFrame(this.verificarVideo.bind(this));
      }
  }

  public obtenerDatosQR(): boolean {
    const w: number = this.video.nativeElement.videoWidth;
    const h: number = this.video.nativeElement.videoHeight;
    
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h; // Corregido de width a height
    
    const context: CanvasRenderingContext2D 
      = this.canvas.nativeElement.getContext('2d'); // Corregido getcontext a getContext
    context.drawImage(this.video.nativeElement, 0, 0, w, h);
    
    const img: ImageData = context.getImageData(0, 0, w, h); // Corregido los parámetros
    
    let qrCode: QRCode | null = jsQR(img.data, w, h, { inversionAttempts: "dontInvert" }); // Especificado inversionAttempts
    
    if (qrCode) {
        if (qrCode.data !== '') {
            // Aquí puedes manejar los datos del QR code
            console.log("QR Code data:", qrCode.data);
            return true; // Retorna true si se encontró y se procesó el código QR
        }
    }
    
    return false; // Retorna false si no se encontró ningún código QR
}


  public mostrarDatosQROrdenados(datosQR: string): void {
    this.datosQR = datosQR;
    const objetoDatosQR = JSON.parse(datosQR);
  }

  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }

  navegar(pagina: string) {
    this.usuario.navegarEnviandousuario(this.router, pagina);
  }

}
