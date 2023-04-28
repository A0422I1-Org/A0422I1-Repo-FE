import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryStatistic} from "../../model/category-statistic";
import {ShowtimeStatistic} from "../../model/showtime-statistic";

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {

  constructor(private httpClient: HttpClient) {
  }

  statisticShowtimeMovie(): Observable<ShowtimeStatistic[]> {
    return this.httpClient.get<ShowtimeStatistic[]>('http://localhost:8080' + '/api/admin/showtime-movie');
  }
  statisticShowtimeMovieNonGroupBy(): Observable<ShowtimeStatistic[]> {
    return this.httpClient.get<ShowtimeStatistic[]>('http://localhost:8080' + '/api/admin/showtime-movie');
  }
}
