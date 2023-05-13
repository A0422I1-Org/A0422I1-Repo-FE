import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryStatistic} from "../../model/category-statistic";
import {ShowtimeStatistic} from "../../model/showtime-statistic";
import {ToastrService} from "ngx-toastr";
import {TokenStorageService} from "../token/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {
  httpOptions: any;
  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+this.tokenStorage.getUser().token,
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS'
      })
    };
  }

  statisticShowtimeMovie(): Observable<any> {
    return this.httpClient.get<ShowtimeStatistic[]>('http://localhost:8080' + '/api/admin/showtime-movie',this.httpOptions);
  }
  statisticShowtimeMovieNonGroupBy(): Observable<any> {
    return this.httpClient.get<ShowtimeStatistic[]>('http://localhost:8080' + '/api/admin/showtime-movie',this.httpOptions);
  }
}
