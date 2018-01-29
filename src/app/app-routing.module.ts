import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NotasComponent } from './notas/notas.component';
import { TestesComponent } from './testes/testes.component';

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
    loadChildren: 'app/propostas/propostas.module#PropostasModule'
  },
  {
    path: 'notas',
    component: NotasComponent
  },
  {
    path: 'testes',
    component: TestesComponent
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
export class AppRoutingModule { }
