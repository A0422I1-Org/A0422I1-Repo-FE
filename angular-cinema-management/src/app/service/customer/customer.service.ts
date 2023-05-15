import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../../model/customer";
import {TokenStorageService} from "../token/token-storage.service";
import {CustomerStatistic} from "../../model/CustomerStatistic";



const URL = 'http://localhost:8080/api/admin/'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  httpOptions: any;
  private API_URL = "http://localhost:8080/api/user/"

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

  getAllTicketByCustomer(page: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + 'ticket/' + page, this.httpOptions)
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

  /*
  Nghia TĐD
   */
  getCustomerByUsername(usermame): Observable<Customer>{
    return this.httpClient.get<Customer>(this.API_URL+'/'+usermame);
  }
  /*
    Nghia TĐD
     */
  updateCustomerUser(id, customer): Observable<any>{
    return this.httpClient.put('http://localhost:8080/api/user/edit/'+id, customer);
  }

}
interface GetReponse {
  content: CustomerStatistic[]
  totalPages: number;
  number: number;
  totalElements: number;
}
