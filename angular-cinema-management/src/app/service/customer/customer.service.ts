import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomerStatistic} from "../../model/CustomerStatistic";
import {MovieStatisti} from "../../model/MovieStatisti";
import {TokenStorageService} from "../token/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  httpOptions: any;
  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+this.tokenStorage.getUser().token,
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS'
      })
    };
  }

  getCustomerStatisticListDTO(page: number, nameCustomer: string, statusSort: string): Observable<any> {
    return this.httpClient.get<GetReponse>('http://localhost:8080' + '/api/admin/customer-statistic-list?page=' + page + '&nameCustomer=' + nameCustomer+ '&statusSort=' + statusSort,this.httpOptions)
  }

  getRankCustomer(id: number): Observable<any> {
    return this.httpClient.get<number>('http://localhost:8080' + '/api/admin/get-rank-customer?customerId='+id,this.httpOptions);
  }


}
interface GetReponse {
  content: CustomerStatistic[]
  totalPages: number;
  number: number;
  totalElements: number;
}
