import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {TokenStorageService} from "../../service/token/token-storage.service";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService) { }

  intercept(req, next) {
    let authReq = req;
    const tokenValue = this.token.getToken();
    console.log(tokenValue)
    if (tokenValue != null) {
      authReq = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${tokenValue}`,
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'Access-Control-Allow-Origin': 'http://localhost:4200'
        },
      });
    }
    return next.handle(authReq);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: Interceptor  , multi: true }
];
