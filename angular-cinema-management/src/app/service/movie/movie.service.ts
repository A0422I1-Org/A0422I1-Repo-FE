import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MovieStatisti} from "../../model/MovieStatisti";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) {
  }

  getMovieStatisticList(): Observable<MovieStatisti[]> {
    return this.httpClient.get<MovieStatisti[]>('http://localhost:8080'+'/statistic/movie-statistic-list')
  }

  getMovieStatisticListAcs(): Observable<MovieStatisti[]> {
    return this.httpClient.get<MovieStatisti[]>('http://localhost:8080'+'/statistic/movie-list-acs')
  }

  searchMovieStatisticListByName(nameMovie: string ): Observable<MovieStatisti[]> {
    return this.httpClient.get<MovieStatisti[]>('http://localhost:8080'+'/statistic/search-movie-List?nameMovie='+nameMovie)
  }
}
