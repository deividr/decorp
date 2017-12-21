import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RoutingModule } from './routing/routing.module';

import { InMemoryPropostaService } from './service/in-memory-proposta.service';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { NotasComponent } from './notas/notas.component';
import { PropostaListComponent } from './propostas/proposta-list/proposta-list.component';

import { PropostaService } from './propostas/proposta.service';
import { PaginationComponent } from './pagination/pagination.component';
import { PropostaDetailComponent } from './propostas/proposta-detail/proposta-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    NotasComponent,
    PropostaListComponent,
    PaginationComponent,
    PropostaDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryPropostaService)
  ],
  providers: [PropostaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
