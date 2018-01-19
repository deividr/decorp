import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaginationComponent } from '../pagination/pagination.component';
import { PropostasComponent } from '../propostas/propostas.component';
import { PropostaDetailComponent } from '../propostas/proposta-detail/proposta-detail.component';
import { PropostasRoutingModule } from './propostas-routing.module';
import { PropostasService } from './propostas.service';
import { PropostaEditComponent } from './proposta-edit/proposta-edit.component';
import { PropostaNewComponent } from './proposta-new/proposta-new.component';

@NgModule({
  imports: [
    CommonModule,
    PropostasRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PaginationComponent,
    PropostasComponent,
    PropostaDetailComponent,
    PropostaEditComponent,
    PropostaNewComponent
  ],
  providers: [
    PropostasService
  ]
})
export class PropostasModule { }
