import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiInfoPage } from './mi-info.page';

const routes: Routes = [
  {
    path: '',
    component: MiInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiInfoPageRoutingModule {}
