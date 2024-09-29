import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: 'mi-info',
        loadChildren: () => import('./mi-info/mi-info.module').then(m => m.MiInfoPageModule)
      },
      {
        path: 'codigo-qr',
        loadChildren: () => import('./codigo-qr/codigo-qr.module').then(m => m.CodigoQrPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/inicio',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '', 
    redirectTo: '/tabs/inicio',
    pathMatch: 'full'
  },  {
    path: 'mi-curso',
    loadChildren: () => import('./mi-curso/mi-curso.module').then( m => m.MiCursoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}