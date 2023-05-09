import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ticket} from "../../model/ticket";
import {Observable} from "rxjs";
import {TicketDTO} from "../../component/admin-ticket-management/dto/ticket-dto";
import {TokenStorageService} from "../token/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  httpOptions: any;
  private API_URL_GET_ALL_TICKET = "http://localhost:8080/api/admin";

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

  getAllTicket(nameSearch: string, page: number): Observable<any> {
    console.log(this.httpOptions)
    return this.httpClient.get<GetResponse>(`${this.API_URL_GET_ALL_TICKET}?nameSearch=${nameSearch}&page=${page}`, this.httpOptions);
  }

  getTicket(id: string): Observable<any> {
    return this.httpClient.get<TicketDTO>(`${this.API_URL_GET_ALL_TICKET}/detail/` + id, this.httpOptions)
  }

  deleteTicketById(id: string): Observable<any> {
    return this.httpClient.delete<Boolean>(`${this.API_URL_GET_ALL_TICKET}/deleteTicket/` + id, this.httpOptions);
  }
}

interface GetResponse {
  content: Ticket[];
  totalPages: number;
  number: number;
  totalElements: number;
}
