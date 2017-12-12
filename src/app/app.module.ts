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
import { PropostasComponent } from './propostas/propostas.component';

import { PropostaService } from './service/proposta.service';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    NotasComponent,
    PropostasComponent,
    PaginationComponent
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
