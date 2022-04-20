import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroChecadaPage } from './registro-checada.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroChecadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroChecadaPageRoutingModule {}
