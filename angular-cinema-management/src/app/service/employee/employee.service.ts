import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {EmployeeViewDTO} from "../../component/admin-employee-management/dto/employee/employee-view-dto";
import {EmployeeDeleteDTO} from "../../component/admin-employee-management/dto/employee/employee-delete-dto";
import {TokenStorageService} from "../token/token-storage.service";
import {EmployeeDTO} from "../../component/admin-employee-management/dto/employee/employeeDTO";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  httpOptions: any;
  url = 'http://localhost:8080/api/admin/employee';

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) {

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getUser().token,
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS'
      })

    };
    console.log(this.httpOptions)
  }

  findAllByNameAndPositionId(
    name: string, positionId: number, page: number): Observable<any> {
    return this.httpClient.get<GetResponse>(
      `${this.url}?name=${name}&positionId=${positionId}&page=${page}`,this.httpOptions);
  }

  findById(id: string): Observable<any> {
    return this.httpClient.get<EmployeeDeleteDTO>(`${this.url}/${id}`,this.httpOptions);
  }

  deleteById(id: string): Observable<any> {
    return this.httpClient.delete<number>(`${this.url}/${id}`,this.httpOptions);
  }

  save(employeeCreate: EmployeeDTO[]): Observable<any>{
    return this.httpClient.post<EmployeeDTO>(this.url+'/add',employeeCreate,this.httpOptions)
  }

  getEmployeeById(id: string): Observable<any> {
    return this.httpClient.get<EmployeeDTO>(this.url+'/update/'+ id,this.httpOptions);
  }

  updateEmployee(employeeEditDTO: EmployeeDTO): Observable<any> {
    return this.httpClient.put<EmployeeDTO>(this.url+'/update', employeeEditDTO,this.httpOptions);
  }
}

interface GetResponse {
  content: EmployeeViewDTO[];
  totalPages: number;
  number: number;
  totalElements: number;



}
