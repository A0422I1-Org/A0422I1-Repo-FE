
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {MovieListDTO} from "../../component/user-view-movie/dto/MovieListDTO";

import {MovieDetailDTO} from "../../dto/movie-detail-dto";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Movie} from "../../model/movie";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private API_URL_GET_ALL_MOVIE = "http://localhost:8080/api/public/movie/list-movie-by-date-show-time"
  private API_URL_MOVIE = "http://localhost:8080/api/public/movie";

  constructor(private  httpClient: HttpClient) { }

  //Transfer header to movie-list: to display on showing movie or upcoming move
  private selectionSource = new BehaviorSubject<string>('on-showing');
  currentSelection = this.selectionSource.asObservable();
  private movieListComponentVisible = new BehaviorSubject<boolean>(false);
  movieListVisible = this.movieListComponentVisible.asObservable();

  changeSelection(selection: string) {
    this.selectionSource.next(selection);
  }

  setMovieListVisible(visible: boolean) {
    this.movieListComponentVisible.next(visible);
  }


  getOnShowingMovie(): Observable<MovieListDTO[]>{
    return this.httpClient.get<MovieListDTO[]>(this.API_URL_MOVIE + "/list/onShowing");
  }

  getUpComingMovie(): Observable<MovieListDTO[]>{
    return this.httpClient.get<MovieListDTO[]>(this.API_URL_MOVIE + "/list/upcoming");
  }

  getMovieByName(name: string): Observable<MovieListDTO[]> {
    return this.httpClient.get<MovieListDTO[]>(this.API_URL_MOVIE + "/find?name=" + name);
  }

  getMovieDetailByMovieId(idMovie: number): Observable<MovieDetailDTO> {
    return this.httpClient.get<MovieDetailDTO>(this.API_URL_MOVIE + "/detail/" + idMovie);
  }

  getAllMovie(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.API_URL_GET_ALL_MOVIE);
  }
}
