import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {MovieDTOView} from "../dto/movieDTOView";
import {TokenStorageService} from "../../../service/token/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
  url = "http://localhost:8080/api/admin/movie";
  httpOptions: any;
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` +this.tokenStorage.getToken(),
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS'
      })
    };
    console.log(this.httpOptions)
  }

  getAllList(
    name: string, startDay: string, timeAmount: string, studios: string, page: number): Observable<any> {
    return this.http.get<GetResponse>(`${this.url}?name=${name}&startDay=${startDay}&studios=${studios}&timeAmount=${timeAmount}&page=${page}`, this.httpOptions);
  }

  findById(id: string):Observable<any> {
    return this.http.get<MovieDTOView>(`${this.url}/${id}`, this.httpOptions);
  }


  deleteById(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, this.httpOptions)
  }
}

interface GetResponse {
  content: MovieDTOView[];
  totalPages: number;
  number: number;
}


