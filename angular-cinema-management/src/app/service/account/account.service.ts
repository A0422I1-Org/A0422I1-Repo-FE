import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../token/token-storage.service";
import {Observable} from "rxjs";
import {SignupRequest} from "../../model/SignupRequest";
import {ResetPassRequest} from "../../model/ResetPassRequest";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  httpOptions:any;
  baseURL="http://localhost:8080/"
  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService ) {
    // this.httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer `+this.tokenStorage.getToken()})
    //   ,'Access-Control-Allow-Origin': 'http://localhost:4200',
    //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    // };
    if (tokenStorage.getUser() != null) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.tokenStorage.getUser().token}`,
          'Access-Control-Allow-Origin': 'http://localhost:4200',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS'
        }),
      };
    }
  }

  recoverPage(accountName: string): Observable<any>{
    return this.httpClient.get(this.baseURL+"recover/" + accountName);
  }

  // NghiaTDD
  register(signupRequest: SignupRequest): Observable<SignupRequest>{
    return this.httpClient.post<SignupRequest>('http://localhost:8080/api/public/signup', signupRequest);
  }

  doResetPassword(resetPassRequest : ResetPassRequest): Observable<any>{
    return this.httpClient.put<ResetPassRequest>('http://localhost:8080/api/user/do-reset-password', resetPassRequest,this.httpOptions);
  }

}
