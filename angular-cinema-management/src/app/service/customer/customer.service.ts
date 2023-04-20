import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomerStatistic} from "../../model/CustomerStatistic";
import {MovieStatisti} from "../../model/MovieStatisti";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  getCustomerStatisticListDTO(): Observable<CustomerStatistic[]> {
    return this.httpClient.get<CustomerStatistic[]>('http://localhost:8080'+'/statistic/customer-statistic-list')
  }

  getCustomerStatisticListDTOAcs(): Observable<CustomerStatistic[]> {
    return this.httpClient.get<CustomerStatistic[]>('http://localhost:8080'+'/statistic/customer-statistic-list-asc')
  }

  searchCustomerStatisticListByName(nameCustomer: string ): Observable<CustomerStatistic[]> {
    return this.httpClient.get<CustomerStatistic[]>('http://localhost:8080'+'/statistic/customer-statistic-list-search?nameCustomer='+nameCustomer)
  }

}
