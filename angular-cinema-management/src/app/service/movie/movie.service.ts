import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Movie} from "../../model/movie";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private API_URL_GET_ALL_MOVIE = "http://localhost:8080/api/public/movie/list-movie-by-start-date"

  constructor(private httpClient: HttpClient) {
  }

  movies: Movie[] = [];

  getAllMovie(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.API_URL_GET_ALL_MOVIE );
  }
}
