import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryPropostaService } from './propostas/in-memory-proposta.service' ;

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { NotasComponent } from './notas/notas.component';

import { TestesComponent } from './testes/testes.component';
import { HighlightMouseDirective } from './testes/highlight-mouse.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    NotasComponent,
    TestesComponent,
    HighlightMouseDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryPropostaService)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
