import { Injectable } from '@angular/core';
import {TokenStorageService} from "../token/token-storage.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Ticket } from "src/app/model/ticket";

@Injectable({
  providedIn: "root",
})
export class TicketService {
  httpOptions: any;
  private API_URL =
    "http://localhost:8080/api/public/ticket/list-ticket-by-rom-showtime/";
  private listSeatChoosing = new BehaviorSubject<any[]>([]);

  getListSeatChoosing = this.listSeatChoosing.asObservable();

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

  getTicketByShowTimeAndRoom(
    idRoom: number,
    idShowTime: number
  ): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(
      this.API_URL + idRoom + "/" + idShowTime
    );
  }
  changeList(list: any[]) {
    this.listSeatChoosing.next(list);
  }
}
