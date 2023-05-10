import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EmployeeDTO} from "../../model/employeeDTO";
import {Observable} from "rxjs";
import {EmployeeEditDTO} from "../../model/employeeEditDTO";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private URL_API ="http://localhost:8080/api/employee/add";
  private URL_APIL ="http://localhost:8080/api/employee";
  constructor(private  httpClient: HttpClient) {}

  save(employeeCreate: EmployeeDTO[]): Observable<EmployeeDTO>{
    return this.httpClient.post<EmployeeDTO>(this.URL_API,employeeCreate)
  }
  getAll(): Observable <EmployeeDTO[]> {
    return this.httpClient.get<EmployeeDTO[]>(this.URL_APIL);
  }
  getEmployeeById(id: string): Observable<EmployeeDTO> {
    return this.httpClient.get<EmployeeDTO>("http://localhost:8080/api/employee/update/"+ id);
  }

  updateEmployee(employeeEditDTO: EmployeeDTO): Observable<EmployeeDTO> {
    return this.httpClient.put<EmployeeDTO>("http://localhost:8080/api/employee/update", employeeEditDTO);
  }
}
