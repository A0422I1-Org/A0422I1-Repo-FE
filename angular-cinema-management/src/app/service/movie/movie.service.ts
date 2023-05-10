import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {MovieDetailDTO} from "../../dto/movie-detail-dto";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Movie} from "../../model/movie";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private API_URL_GET_ALL_MOVIE = "http://localhost:8080/api/public/movie/list-movie-by-date-show-time"

  private API_URL_MOVIE = "http://localhost:8080/api/public/movie";

  constructor(private  httpClient: HttpClient) {
  }

  getMovieDetailByMovieId(idMovie: number): Observable<MovieDetailDTO> {
    return this.httpClient.get<MovieDetailDTO>(this.API_URL_MOVIE + "/detail/" + idMovie);
  }

  movies: Movie[] = [];

  getAllMovie(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.API_URL_GET_ALL_MOVIE);
  }
}
