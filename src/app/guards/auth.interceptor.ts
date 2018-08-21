import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('idToken');

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + idToken)
      });
      return next.handle(cloned).catch(error => this.handleError(error));
    } else {
      return next.handle(req);
    }
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401 || error.status === 403) {
      this.router.navigateByUrl('/login');
      return Observable.of(error.message);
    }

    return Observable.throw(error);
  }
}
