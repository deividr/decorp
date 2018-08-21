import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/models';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment-timezone';

@Injectable()
export class AuthService {
  private mostrarMenuSubject = new BehaviorSubject(false);
  private mensagem = new BehaviorSubject('');
  private authUrl = 'api/auth';

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  login(user: User): Observable<any> {
    return this.httpClient
      .post<User>(this.authUrl, user)
      .do(
        (res) => this.setSession(res),
        (err) => {
          if (err.status === 401) {
            this.mensagem.next('Login inválido!');
          } else {
            this.mensagem.next(err.message);
          }
        }
      )
      .shareReplay();
  }

  logout() {
    localStorage.removeItem('idToken');
    localStorage.removeItem('expires_at');

    this.mostrarMenuSubject.next(false);
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('idToken', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

    this.mostrarMenuSubject.next(true);
  }

  get mostrarMenu(): BehaviorSubject<boolean> {
    return this.mostrarMenuSubject;
  }

  get obterMensagem(): BehaviorSubject<string> {
    return this.mensagem;
  }

  get userIsAuthenticated(): boolean {
    if (!this.getExpiration()._isValid || moment().isAfter(this.getExpiration())) {
      this.mostrarMenu.next(false);
      this.logout();
      return false;
    }

    return true;
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
