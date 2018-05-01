import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from '../pagination/pagination.module';

import { PropostasComponent } from '../propostas/propostas.component';
import { PropostaDetailComponent } from '../propostas/proposta-detail/proposta-detail.component';
import { PropostasRoutingModule } from './propostas-routing.module';
import { PropostasService } from './propostas.service';
import { PropostaEditComponent } from './proposta-edit/proposta-edit.component';
import { PropostaNewComponent } from './proposta-new/proposta-new.component';
import { NotasService } from '../notas/notas.service';

@NgModule({
  imports: [
    CommonModule,
    PropostasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule
  ],
  declarations: [
    PropostasComponent,
    PropostaDetailComponent,
    PropostaEditComponent,
    PropostaNewComponent
  ],
  providers: [
    PropostasService,
    NotasService
  ]
})
export class PropostasModule { }
