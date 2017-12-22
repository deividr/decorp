import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { PropostaListComponent } from '../propostas/proposta-list/proposta-list.component';
import { PropostaDetailComponent } from '../propostas/proposta-detail/proposta-detail.component';

const routes: Routes = [
  { path: '', component: PropostaListComponent },
  { path: ':id', component: PropostaDetailComponent }
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
