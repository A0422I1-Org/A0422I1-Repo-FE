import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const AUTH_API = 'http://localhost:8080/api/public/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private httpClient: HttpClient) { }

  login(obj): Observable<any> {
    return this.httpClient.post(AUTH_API + 'login', {
      username: obj.username,
      password: obj.password
    }, httpOptions);
  }

  findEmployeeByUsername(username: string): Observable<any> {
    return this.httpClient.get<any>(AUTH_API + 'findEmployeeByUsername/' + username, httpOptions);
  }

  findCustomerByUsername(username: string): Observable<any> {
    return this.httpClient.get<any>(AUTH_API + 'findCustomerByUsername/' + username, httpOptions);
  }

  verify(code: string): Observable<any> {
    return this.httpClient.post(AUTH_API + 'verify', {
      code: code
    }, httpOptions);
  }

  verifyPassword(code: string): Observable<any> {
    return this.httpClient.post(AUTH_API + 'verify-password', {
      code: code
    }, httpOptions);
  }

  resetPassword(username: string): Observable<any> {
    return this.httpClient.post(AUTH_API + 'reset-password', {
      username: username
    }, httpOptions);
  }

  hasResetPassword(password: string, code: string): Observable<any> {
    return this.httpClient.post(AUTH_API + 'has-reset-password', {
      password: password,
      code: code
    }, httpOptions);
  }

}
