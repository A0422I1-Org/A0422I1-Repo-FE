import {HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Promotion} from "src/app/model/promotion";

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private API_URL_PROMOTION ="http://localhost:8080/api/public/promotion";

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Promotion[]> {
    return this.httpClient.get<Promotion[]>(`${this.API_URL_PROMOTION}/list`);
  }

    findById(id: number): Observable<Promotion> {
    return this.httpClient.get<Promotion>(`${this.API_URL_PROMOTION}/${id}`);
  }

}
