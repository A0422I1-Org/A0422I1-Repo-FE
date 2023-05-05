import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../../model/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  readonly API_URL = 'http://localhost:8080/api/user';
  constructor(private httpClient: HttpClient) { }

  getCustomerByUsername(usermame): Observable<Customer>{
    return this.httpClient.get<Customer>(this.API_URL+'/'+usermame);
  }

  // updateCustomer(id, customer: Customer): Observable<Customer>{
  //   return this.httpClient.put<Customer>(this.API_URL+'/edit/'+id, customer);
  // }

  updateCustomer(id, customer): Observable<any>{
    return this.httpClient.put(this.API_URL+'/edit/'+id, customer);
  }

}
