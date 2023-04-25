import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PositionViewDTO} from "../../dto/employee/position-view-dto";

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  url = 'http://localhost:8080/api/admin/position';

  constructor(private http: HttpClient) { }

  findAll(): Observable<PositionViewDTO[]> {
    return this.http.get<PositionViewDTO[]>(
      `${this.url}`
    );
  }
}
