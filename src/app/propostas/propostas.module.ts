import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { PaginationComponent } from '../pagination/pagination.component';
import { PropostaListComponent } from '../propostas/proposta-list/proposta-list.component';
import { PropostaDetailComponent } from '../propostas/proposta-detail/proposta-detail.component';
import { PropostasRoutingModule } from './propostas-routing.module';
import { PropostasService } from './propostas.service';

@NgModule({
  imports: [
    CommonModule,
    PropostasRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PaginationComponent,
    PropostaListComponent,
    PropostaDetailComponent
  ],
  providers: [
    PropostasService
  ]
})
export class PropostasModule { }
