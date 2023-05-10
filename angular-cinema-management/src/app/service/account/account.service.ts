import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignupRequest} from "../../model/signup-request";
import {Observable} from "rxjs";
import {ResetPassRequest} from "../../model/ResetPassRequest";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private httpClient: HttpClient) { }
  readonly API_URL = 'http://localhost:8080/api';

  register(signupRequest: SignupRequest): Observable<SignupRequest>{
    return this.httpClient.post<SignupRequest>(this.API_URL+ '/public/signup', signupRequest);
  }

  doResetPassword(resetPassRequest : ResetPassRequest): Observable<ResetPassRequest>{
    return this.httpClient.post<ResetPassRequest>(this.API_URL+'/user/do-reset-password', resetPassRequest);
  }

}
