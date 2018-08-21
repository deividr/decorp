import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';

import { TestesComponent } from './testes/testes.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'propostas',
    loadChildren: './propostas/propostas.module#PropostasModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'notas',
    loadChildren: './notas/notas.module#NotasModule',
    canActivate: [AuthGuard]
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
