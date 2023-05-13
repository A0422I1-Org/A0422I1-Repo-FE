import { Injectable } from '@angular/core';
import {Customer} from "../../model/customer";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../token/token-storage.service";

const URL = 'http://localhost:8080/api/admin/'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  httpOptions: any;

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) {

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken(),
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS'
      })
    };
    // console.log(this.httpOptions)
  }

  getCustomer(search: string, page: number): Observable<any> {
    return this.httpClient.get<any>(`${URL}customer-management?search=${search}&page=${page}`, this.httpOptions);
  }
  getCustomerById(id: string): Observable<any> {
    return this.httpClient.get<Customer>(URL + "update/" + id, this.httpOptions);
  }

  updateCustomer(customerDTO: Customer): Observable<any> {
    return this.httpClient.put<Customer>(URL + "update", customerDTO, this.httpOptions);
  }
}
