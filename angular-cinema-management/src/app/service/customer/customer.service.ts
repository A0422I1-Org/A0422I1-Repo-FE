import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  httpOptions: any
  private API_URL = "http://localhost:8080/api/customer/"

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
    return this.httpClient.get<any>(this.API_URL + 'customer-ticket/' + page, this.httpOptions)

  }
}
