import { Injectable } from '@angular/core';
import {TokenStorageService} from "../token/token-storage.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Ticket } from "src/app/model/ticket";
import {TicketDTO} from "../../component/admin-ticket-management/dto/ticket-dto";

@Injectable({
  providedIn: "root",
})
export class TicketService {
  httpOptions: any;
  private API_URL =
    "http://localhost:8080/api";

  private API_URL_GET_ALL_TICKET = "http://localhost:8080/api/admin";

  private listSeatChoosing = new BehaviorSubject<any[]>([]);

  getListSeatChoosing = this.listSeatChoosing.asObservable();

  constructor(private  httpClient: HttpClient,
              private token: TokenStorageService) {
    const tokenValue = this.token.getToken();

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
  ): Observable<any> {
    return this.httpClient.get<any>(
      this.API_URL +
        "/user/ticket/list-ticket-by-rom-showtime/" +
        idRoom +
        "/" +
        idShowTime,
      this.httpOptions
    );
  }
  changeList(list: any[]) {
    this.listSeatChoosing.next(list);
  }

  getAllTicket(nameSearch: string, page: number): Observable<any> {
    console.log(this.httpOptions)
    return this.httpClient.get<GetResponse>(`${this.API_URL_GET_ALL_TICKET}?nameSearch=${nameSearch}&page=${page}`, this.httpOptions);
  }

  getTicket(id: string): Observable<any> {
    return this.httpClient.get<TicketDTO>(`${this.API_URL_GET_ALL_TICKET}/detail/` + id, this.httpOptions)
  }
  updateTicketById(id:string):Observable<any>{
    return this.httpClient.delete<Boolean>(`${this.API_URL_GET_ALL_TICKET}/bookingConfirmation/` + id, this.httpOptions)
  }
  deleteTicketById(id: string): Observable<any> {
    return this.httpClient.delete<Boolean>(`${this.API_URL_GET_ALL_TICKET}/deleteTicket/` + id, this.httpOptions);
  }
  addTicketCheckList(ticketId: string) {
    return this.httpClient.get("http://localhost:8080/api/ticket/addTicketCheckList/"+ticketId, this.httpOptions);
  }
  clearTicketCheckList() {
    return this.httpClient.get("http://localhost:8080/api/ticket/clearTicketCheckList/", this.httpOptions);
  }
}

interface GetResponse {
  content: Ticket[];
  totalPages: number;
  number: number;
  totalElements: number;
}
