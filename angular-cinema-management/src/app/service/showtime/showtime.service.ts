import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Showtime} from "../../model/showtime";

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {
  private API_URL_GET_SHOWTIME = "http://localhost:8080/api/cinema/showtime/showtime-by-movie/";
  showTimes: Showtime[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getShowtimeByIdMovie(id: number): Observable<Showtime[]> {
    return this.httpClient.get<Showtime[]>(this.API_URL_GET_SHOWTIME + id);
  }
  // getShowTimeByDateAndByIdMovie(date: string,id:number): Observable<Showtime[]>{
  //   return this.httpClient.get<Showtime[]>(this.API_URL_GET_SHOWTIME + date + id);
  // }
}
