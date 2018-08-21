import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { PaginationModule } from './pagination/pagination.module';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { TestesComponent } from './testes/testes.component';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './guards/auth.interceptor';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    TestesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    PaginationModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
