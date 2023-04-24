import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MovieDetailDto} from "../../dto/movie-detail-dto";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private API_URL_MOVIE = "http://localhost:8080/api/movie";

  constructor(private  httpClient: HttpClient) {
  }

  getMovieDetailByMovieId(idMovie: number): Observable<MovieDetailDto> {
    return this.httpClient.get<MovieDetailDto>(this.API_URL_MOVIE + "/detail/" + idMovie);
  }
}
