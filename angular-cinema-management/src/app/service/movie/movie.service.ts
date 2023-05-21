import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {MovieListDTO} from "../../component/user-view-movie/dto/MovieListDTO";

import {MovieDetailDTO} from "../../dto/movie-detail-dto";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Movie} from "../../model/movie";
import {MovieStatisti} from "../../model/MovieStatisti";
import {TokenStorageService} from "../token/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  httpOptions: any;

  private API_URL_GET_ALL_MOVIE = "http://localhost:8080/api/public/movie/list-movie-by-date-show-time"
  private API_URL_MOVIE = "http://localhost:8080/api/public/movie";

  constructor(private  httpClient: HttpClient,
    private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+this.tokenStorage.getToken(),
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS'
      })
    };
  }

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

  getAllMovie(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_GET_ALL_MOVIE,
      this.httpOptions);
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
