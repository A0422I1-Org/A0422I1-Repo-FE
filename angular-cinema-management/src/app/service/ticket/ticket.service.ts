import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ticket} from "../../model/ticket";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private  httpClient: HttpClient) { }

  findAll(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>("http://localhost:8080/api/ticket/list");
  }

  findTicketsChoosed(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>("http://localhost:8080/api/ticket/ticket-choosed");
  }

  findById(id: string): Observable<Ticket> {
    return this.httpClient.get<Ticket>("http://localhost:8080/api/ticket/" + id);
  }

  confirmTicket(ticket: Ticket): Observable<any> {
    return this.httpClient.post("http://localhost:8080/api/ticket/confirm-booking-ticket", ticket);
  }
}
