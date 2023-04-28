import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../../model/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  findById(id: string): Observable<Customer> {
    return this.httpClient.get<Customer>("http://localhost:8080/api/public/user/" + id);
  }
}
