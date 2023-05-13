import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "../token/token-storage.service";

const AUTH_API = 'http://localhost:8080/api/public/';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  httpOptions: any;
  isLoggedIn: boolean;

  constructor(private httpClient: HttpClient,
              private token: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS'
    };
  }

  login(obj): Observable<any> {
    return this.httpClient.post(AUTH_API + 'login', {
      username: obj.username,
      password: obj.password
    }, this.httpOptions);
  }

  verify(code: string): Observable<any> {
    console.log(code);
    return this.httpClient.post(AUTH_API + 'verify', {
      code: code
    }, this.httpOptions);
  }

  verifyPassword(code: string): Observable<any> {
    return this.httpClient.post(AUTH_API + 'verify-password', {
      code: code
    }, this.httpOptions);
  }

  resetPassword(username: string): Observable<any> {
    return this.httpClient.post(AUTH_API + 'reset-password', {
      username: username
    }, this.httpOptions);
  }

  hasResetPassword(password: string, code: string): Observable<any> {
    return this.httpClient.post(AUTH_API + 'has-reset-password', {
      password: password,
      code: code
    }, this.httpOptions);
  }

}
