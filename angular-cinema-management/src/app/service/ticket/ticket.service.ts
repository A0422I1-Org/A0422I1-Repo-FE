import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ticket} from "../../model/ticket";
import {TokenStorageService} from "../token/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  httpOptions: any;

  constructor(private  httpClient: HttpClient,
              private token: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token.getUser().token}`,
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS'
      }),
    };
  }

  findAll(): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8080/api/ticket/list", this.httpOptions);
  }

  findTicketsChoosed(): Observable<any> {
    console.log(this.httpOptions)
    return this.httpClient.get<any>("http://localhost:8080/api/user/ticket-choosed", this.httpOptions);
  }

  findById(id: string): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8080/api/ticket/" + id, this.httpOptions);
  }

  confirmTicket(ticket: Ticket): Observable<any> {
    return this.httpClient.post("http://localhost:8080/api/user/confirm-booking-ticket", ticket, this.httpOptions);
  }
}
