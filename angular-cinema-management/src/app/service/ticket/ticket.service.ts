import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Ticket} from "../../model/ticket";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private API_URL_GET_ALL_TICKET ="http://localhost:8080/api";
  constructor(private httpClient:HttpClient) { }
  getAllTicket(nameSearch:string,page:number):Observable<GetResponse>{
    return this.httpClient.get<GetResponse>(`${this.API_URL_GET_ALL_TICKET}?nameSearch=${nameSearch}&page=${page}`);
  }
}
interface GetResponse {
  content: Ticket[];
  totalPages: number;
  number: number;
  totalElements: number;
}
