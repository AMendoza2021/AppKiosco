import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroChecadaPageRoutingModule } from './registro-checada-routing.module';

import { RegistroChecadaPage } from './registro-checada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroChecadaPageRoutingModule
  ],
  declarations: [RegistroChecadaPage]
})
export class RegistroChecadaPageModule {}
