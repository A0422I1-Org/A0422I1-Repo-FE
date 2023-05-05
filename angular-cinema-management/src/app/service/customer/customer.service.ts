import { Injectable } from '@angular/core';
import {Customer} from "../../model/customer";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) {
  }

  getCustomer(search: string, page: number): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8080/customer-management?search=" + search + "&page=" + page);
  }

  getCustomerById(id: string): Observable<Customer> {
    return this.httpClient.get<Customer>("http://localhost:8080/customer-management/update/" + id);
  }

  updateCustomer(customerDTO: Customer): Observable<Customer> {
    return this.httpClient.put<Customer>("http://localhost:8080/customer-management/update", customerDTO);
  }
}
