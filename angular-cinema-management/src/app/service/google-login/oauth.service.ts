import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Token} from "../../model/token";

const cabecera = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  hasLoggedIn: boolean;

  oauthURL = 'http://localhost:8080/api/public';

  constructor(private httpClient: HttpClient) { }

  public google(token: Token): Observable<Token> {
    return this.httpClient.post<Token>(this.oauthURL + '/login-social', token, cabecera);
  }

}
