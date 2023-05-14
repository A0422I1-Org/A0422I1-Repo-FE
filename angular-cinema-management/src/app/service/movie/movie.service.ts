import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {MovieStatisti} from "../../model/MovieStatisti";
import {TokenStorageService} from "../token/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  httpOptions: any;
  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+this.tokenStorage.getToken(),
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS'
      })
    };
  }

  getMovieStatisticListPaging(page: number, nameMovie: string, statusSort: string): Observable<any> {
    return this.httpClient.get<GetReponse>('http://localhost:8080' + '/api/admin/movie-statistic-list?page=' + page + '&nameMovie=' + nameMovie+ '&statusSort=' + statusSort, this.httpOptions)
  }
}

interface GetReponse {
  content: MovieStatisti[]
  totalPages: number;
  number: number;
  totalElements: number;
}
