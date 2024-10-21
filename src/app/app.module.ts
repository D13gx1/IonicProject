import { NgModule, LOCALE_ID } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Importar HttpClient
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'; // Importar TranslateLoader
import { TranslateHttpLoader } from '@ngx-translate/http-loader'; // Importar TranslateHttpLoader

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Función de carga de traducciones
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ innerHTMLTemplatesEnabled: true }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule, // Asegúrate de incluir HttpClientModule

    // Importar TranslateModule
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory, // Usar el loader de HTTP
        deps: [HttpClient] // Dependencia del HttpClient
      }
    })
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: LOCALE_ID,
      useValue: 'es-CL' // Cambiar si es necesario
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
