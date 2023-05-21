import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MovieDTOView} from "../dto/movieDTOView";

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
  url = "http://localhost:8080/api/admin/movie";

  constructor(private http: HttpClient) {
  }

  getAllList(
    name: string, startDay: string, timeAmount: string, studios: string, page: number): Observable<GetResponse> {
    return this.http.get<GetResponse>(`${this.url}?name=${name}&startDay=${startDay}&studios=${studios}&timeAmount=${timeAmount}&page=${page}`);
  }

  findById(id: string) {
    return this.http.get<MovieDTOView>(`${this.url}/${id}`);
  }


  deleteById(id: string): Observable<MovieDTOView> {
    return this.http.delete(`${this.url}/${id}`)
  }
}

interface GetResponse {
  content: MovieDTOView[];
  totalPages: number;
  number: number;
}


