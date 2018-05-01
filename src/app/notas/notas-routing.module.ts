import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotasComponent } from '../notas/notas.component';
import { NotaDetailComponent } from '../notas/nota-detail/nota-detail.component';
import { NotaEditComponent } from '../notas/nota-edit/nota-edit.component';
import { NotaNewComponent } from '../notas/nota-new/nota-new.component';

const routes: Routes = [
  { path: '', component: NotasComponent },
  { path: 'new', component: NotaNewComponent },
  { path: ':id', component: NotaDetailComponent },
  { path: ':id/edit', component: NotaEditComponent }
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
export class NotasRoutingModule { }
