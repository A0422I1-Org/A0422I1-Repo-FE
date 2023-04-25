import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Ticket} from "../../model/ticket";
import {Observable} from "rxjs";
import {TicketDTO} from "../../component/admin-ticket-management/dto/ticket-dto";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private API_URL_GET_ALL_TICKET ="http://localhost:8080/api/admin";
  constructor(private httpClient:HttpClient) { }
  getAllTicket(nameSearch:string,page:number):Observable<GetResponse>{
    return this.httpClient.get<GetResponse>(`${this.API_URL_GET_ALL_TICKET}?nameSearch=${nameSearch}&page=${page}`);
  }
  getTicket(id:string):Observable<TicketDTO>{
    return this.httpClient.get<TicketDTO>(`${this.API_URL_GET_ALL_TICKET}/detail/`+id)
  }
  deleteTicketById(id:string):Observable<Boolean>{
    return this.httpClient.delete<Boolean>(`${this.API_URL_GET_ALL_TICKET}/deleteTicket/`+id);
  }
}
interface GetResponse {
  content: Ticket[];
  totalPages: number;
  number: number;
  totalElements: number;
}
