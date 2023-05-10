import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {MovieListDTO} from "../../component/user-view-movie/dto/MovieListDTO";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private  httpClient: HttpClient) { }

  private API_URL_MOVIE = "http://localhost:8080/api/public/movie";

  getOnShowingMovie(): Observable<MovieListDTO[]>{
    return this.httpClient.get<MovieListDTO[]>(this.API_URL_MOVIE + "/list/onShowing");
  }

  getUpCommingMovie(): Observable<MovieListDTO[]>{
    return this.httpClient.get<MovieListDTO[]>(this.API_URL_MOVIE + "/list/upcoming");
  }

  getMovieByName(name: string): Observable<MovieListDTO[]>{
    return this.httpClient.get<MovieListDTO[]>(this.API_URL_MOVIE + "/find?name=" + name);
  }
}
