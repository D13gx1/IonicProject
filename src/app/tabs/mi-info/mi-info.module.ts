import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiInfoPageRoutingModule } from './mi-info-routing.module';

import { MiInfoPage } from './mi-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiInfoPageRoutingModule
  ],
  declarations: [MiInfoPage]
})
export class MiInfoPageModule {}
