import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotasRoutingModule } from './notas-routing.module';
import { PaginationModule } from '../pagination/pagination.module';

import { NotasComponent } from './notas.component';
import { NotaDetailComponent } from '../notas/nota-detail/nota-detail.component';
import { NotaEditComponent } from './nota-edit/nota-edit.component';
import { NotaNewComponent } from './nota-new/nota-new.component';

import { NotasService } from './notas.service';
import { PropostasService } from '../propostas/propostas.service';

@NgModule({
  imports: [
    CommonModule,
    NotasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule
  ],
  declarations: [
    NotasComponent,
    NotaDetailComponent,
    NotaEditComponent,
    NotaNewComponent
  ],
  providers: [
    NotasService,
    PropostasService
  ]
})
export class NotasModule { }
