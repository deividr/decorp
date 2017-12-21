import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';

import { PropostaListComponent } from '../propostas/proposta-list/proposta-list.component';
import { PropostaDetailComponent } from '../propostas/proposta-detail/proposta-detail.component';
import { HomeComponent } from '../home/home.component';
import { NotasComponent } from '../notas/notas.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'propostas',
    component: PropostaListComponent
  },
  {
    path: 'propostas/:id',
    component: PropostaDetailComponent
  },
  {
    path: 'notas',
    component: NotasComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
