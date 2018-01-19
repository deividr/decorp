import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PropostasComponent } from '../propostas/propostas.component';
import { PropostaDetailComponent } from '../propostas/proposta-detail/proposta-detail.component';
import { PropostaEditComponent } from '../propostas/proposta-edit/proposta-edit.component';
import { PropostaNewComponent } from '../propostas/proposta-new/proposta-new.component';

const routes: Routes = [
  { path: '', component: PropostasComponent },
  { path: 'new', component: PropostaNewComponent },
  { path: ':id', component: PropostaDetailComponent },
  { path: ':id/edit', component: PropostaEditComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class PropostasRoutingModule { }
