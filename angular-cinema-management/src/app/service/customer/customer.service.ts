import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../../model/customer";
import {TokenStorageService} from "../token/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  httpOptions: any;

  constructor(private  httpClient: HttpClient,
              private token: TokenStorageService) {
    if (token.getUser() != null) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token.getUser().token}`,
          'Access-Control-Allow-Origin': 'http://localhost:4200',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS'
        }),
      };
    }
  }

  findById(id: string): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8080/api/user/" + id, this.httpOptions);
  }

  findByUsername(username: string): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8080/api/user/findByUsername/" + username, this.httpOptions);
  }
}
