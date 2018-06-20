import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';

import { HomeService } from '../home/home.service';
import { NotasService } from '../notas/notas.service';
import { PropostasService } from '../propostas/propostas.service';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
  ],
  providers: [
    HomeService,
    NotasService,
    PropostasService
  ]
})
export class HomeModule { }
