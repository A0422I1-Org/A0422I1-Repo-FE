import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Showtime } from "../../model/showtime";
import { TokenStorageService } from "../token/token-storage.service";
import { HttpHeaders } from "@angular/common/http";
import {CategoryStatistic} from "../../model/category-statistic";
import {ShowtimeStatistic} from "../../model/showtime-statistic";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class ShowtimeService {

  private API_URL_GET_SHOWTIME = "http://localhost:8080/api";
  showTimes: Showtime[] = [];
  httpOptions: any;
  constructor(
    private httpClient: HttpClient,
    private token: TokenStorageService
  ) {
    if (token.getUser() != null) {
      this.httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token.getUser().token}`,
          "Access-Control-Allow-Origin": "http://localhost:4200",
          "Access-Control-Allow-Methods":
            "GET, PUT, POST, DELETE, PATCH, OPTIONS",
        }),
      };
    }
  }
  // constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) {
  //   this.httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer `+this.tokenStorage.getToken(),
  //       'Access-Control-Allow-Origin': 'http://localhost:4200',
  //       'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS'
  //     })
  //   };
  // }
  getShowtimeByIdMovie(id: number): Observable<Showtime[]> {
    return this.httpClient.get<Showtime[]>(
      this.API_URL_GET_SHOWTIME + "/public/showtime/showtime-by-movie/" + id
    );
  }

  getShowtimeById(id: number): Observable<any> {
    return this.httpClient.get<any>(
      this.API_URL_GET_SHOWTIME + "/user/showtime/showtime-by-id/" + id,
      this.httpOptions
    );
  }

  statisticShowtimeMovie(): Observable<any> {
    return this.httpClient.get<ShowtimeStatistic[]>('http://localhost:8080' + '/api/admin/showtime-movie',this.httpOptions);
  }
  statisticShowtimeMovieNonGroupBy(): Observable<any> {
    return this.httpClient.get<ShowtimeStatistic[]>('http://localhost:8080' + '/api/admin/showtime-movie',this.httpOptions);
  }
}
