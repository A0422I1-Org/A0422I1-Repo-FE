import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PositionViewDTO} from "../../component/admin-employee-management/dto/employee/position-view-dto";
import {Position} from "../../model/position";
import {TokenStorageService} from "../token/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  url = 'http://localhost:8080/api/admin/position';
  httpOptions: any;
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

  findAll(): Observable<any> {
    return this.httpClient.get<PositionViewDTO[]>(
      `${this.url}`,this.httpOptions
    );
  }
  getAllPosition(): Observable <any> {
    return this.httpClient.get<Position[]>(`${this.url}`,this.httpOptions);
  }
}
