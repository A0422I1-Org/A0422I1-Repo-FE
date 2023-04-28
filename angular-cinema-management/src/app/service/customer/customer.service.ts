import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomerStatistic} from "../../model/CustomerStatistic";
import {MovieStatisti} from "../../model/MovieStatisti";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) {
  }

  getCustomerStatisticListDTO(page: number, nameCustomer: string, statusSort: string): Observable<GetReponse> {
    return this.httpClient.get<GetReponse>('http://localhost:8080' + '/api/admin/customer-statistic-list?page=' + page + '&nameCustomer=' + nameCustomer+ '&statusSort=' + statusSort)
  }

  getRankCustomer(id: number): Observable<number> {
    return this.httpClient.get<number>('http://localhost:8080' + '/api/admin/get-rank-customer?customerId='+id);
  }


}
interface GetReponse {
  content: CustomerStatistic[]
  totalPages: number;
  number: number;
  totalElements: number;
}
