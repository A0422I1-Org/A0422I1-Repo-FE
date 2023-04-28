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

  getMovieStatisticListPaging(page: number, nameMovie: string, statusSort: string): Observable<GetReponse> {
    return this.httpClient.get<GetReponse>('http://localhost:8080' + '/api/admin/movie-statistic-list?page=' + page + '&nameMovie=' + nameMovie+ '&statusSort=' + statusSort)
  }
}

interface GetReponse {
  content: MovieStatisti[]
  totalPages: number;
  number: number;
  totalElements: number;
}
