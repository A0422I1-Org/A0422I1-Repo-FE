import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EmployeeViewDTO} from "../../dto/employee/employee-view-dto";
import {PositionViewDTO} from "../../dto/employee/position-view-dto";

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  url = 'http://localhost:8080/position';

  constructor(private http: HttpClient) { }

  findAll(): Observable<PositionViewDTO[]> {
    return this.http.get<PositionViewDTO[]>(
      `${this.url}`
    );
  }
}
