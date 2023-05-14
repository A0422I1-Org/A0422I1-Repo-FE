
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "../token/token-storage.service";
import {Customer} from "../../model/customer";
import {CustomerStatistic} from "../../model/CustomerStatistic";

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

  getCustomerStatisticListDTO(page: number, nameCustomer: string, statusSort: string): Observable<any> {
    return this.httpClient.get<GetReponse>('http://localhost:8080' + '/api/admin/customer-statistic-list?page=' + page + '&nameCustomer=' + nameCustomer+ '&statusSort=' + statusSort,this.httpOptions)
  }

  getRankCustomer(id: number): Observable<any> {
    return this.httpClient.get<number>('http://localhost:8080' + '/api/admin/get-rank-customer?customerId='+id,this.httpOptions);
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
interface GetReponse {
  content: CustomerStatistic[]
  totalPages: number;
  number: number;
  totalElements: number;

}
