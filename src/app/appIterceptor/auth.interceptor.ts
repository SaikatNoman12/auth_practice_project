import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthenticationService } from '../appService/authService/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _authService: AuthenticationService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this._authService.user.pipe(
      take(1),
      exhaustMap(
        (user: any) => {
          if (!user) {
            return next.handle(request);
          }
          else {
            const modifiedRec = request.clone(
              { params: new HttpParams().set('auth', user.token) }
            );

            return next.handle(modifiedRec);
          }
        }
      )
    );
  }

}
