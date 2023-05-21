import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RatingMovieDTO} from "../../dto/rating-movie-dto";

@Injectable({
  providedIn: 'root'
})
export class RatingMovieService {

  private API_URL_RATING = "http://localhost:8080/api/public/rating"


  constructor(private httpClient: HttpClient) {
  }

  save(rating: RatingMovieDTO): Observable<RatingMovieDTO> {
    return this.httpClient.post<RatingMovieDTO>(this.API_URL_RATING + '/add', rating);
  }
  getRatingMovieByUsernameAndMovieId(username:String, movieId:number): Observable<RatingMovieDTO> {
    return this.httpClient.get<any>(`${this.API_URL_RATING}/get-rating-movie?username=${username}&movieId=${movieId}`);
  }
}
