import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = "http://localhost:8080/api/customer"

@Injectable({
  providedIn: 'root'
})
export class PointService {
  httpOptions: any;
  private API_URL = 'http://localhost:8080/api/customer/';

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getAllPointByCustomer(page: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + 'customer-point/' + page, this.httpOptions)
  }

  getAllPointByCustomerDateBetween(startDate: string, endDate: string, page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + 'customer-search-point?startDate=' + startDate + '&endDate=' + endDate
      + '&page=' + page + '&size=' + size, this.httpOptions);
  }


  getSumPointByCustomer(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + 'customer-sum-point', this.httpOptions);
  }

}
