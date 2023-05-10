import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Position} from "../../model/position";

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private URL_API="http://localhost:8080/api/employee/position";
  constructor(private httpClient : HttpClient) { }

  getAllPosition(): Observable <Position[]> {
    return this.httpClient.get<Position[]>(this.URL_API);
  }
}
