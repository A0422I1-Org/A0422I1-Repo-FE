import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../../model/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  httpOptions: any
  private API_URL = "http://localhost:8080/api/user/"

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getAllTicketByCustomer(page: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + 'ticket/' + page, this.httpOptions)

  }

  getCustomerByUsername(usermame): Observable<Customer> {
    return this.httpClient.get<Customer>(this.API_URL + usermame);
  }

  // updateCustomer(id, customer: Customer): Observable<Customer>{
  //   return this.httpClient.put<Customer>(this.API_URL+'/edit/'+id, customer);
  // }

  updateCustomer(id, customer): Observable<any> {
    return this.httpClient.put(this.API_URL + '/edit/' + id, customer);
  }
}
