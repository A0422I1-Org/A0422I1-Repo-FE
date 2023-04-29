import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Ticket } from "src/app/model/ticket";

@Injectable({
  providedIn: "root",
})
export class TicketService {
  private API_URL =
    "http://localhost:8080/api/public/ticket/list-ticket-by-rom-showtime/";
  private listSeatChoosing = new BehaviorSubject<any[]>([]);

  getListSeatChoosing = this.listSeatChoosing.asObservable();

  constructor(private httpClient: HttpClient) {}

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
    console.log(this.getListSeatChoosing);
  }
}
