import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EmployeeViewDTO} from "../../dto/employee/employee-view-dto";
import {EmployeeDeleteDTO} from "../../dto/employee/employee-delete-dto";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url = 'http://localhost:8080/employee';

  constructor(private http: HttpClient) { }

  findAllByNameAndPositionId(
    name: string, positionId: number, page: number): Observable<GetResponse> {
    return this.http.get<GetResponse>(
      `${this.url}?name=${name}&positionId=${positionId}&page=${page}`
    );
  }

  findById(id: string): Observable<EmployeeDeleteDTO> {
    return this.http.get<EmployeeDeleteDTO>(`${this.url}/${id}`);
  }

  deleteById(id: string): Observable<number> {
    return this.http.delete<number>(`${this.url}/${id}`);
  }
}

interface GetResponse {
  content: EmployeeViewDTO[];
  totalPages: number;
  number: number;
  totalElements: number;
}
