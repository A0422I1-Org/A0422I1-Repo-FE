import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CategoryStatistic} from "../../model/category-statistic";
import {Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {TokenStorageService} from "../token/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class MovieTypeService {
  httpOptions: any;
  constructor(private httpClient: HttpClient ,
              private toastr: ToastrService, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+this.tokenStorage.getToken(),
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS'
      })
    };
  }

  statisticCategoryMovie(): Observable<any> {
    return this.httpClient.get<CategoryStatistic[]>('http://localhost:8080' + '/api/admin/category-movie', this.httpOptions);
  }
  statisticCategoryMovieNonGroupBy(): Observable<any> {
    return this.httpClient.get<CategoryStatistic[]>('http://localhost:8080' + '/api/admin/category-movie', this.httpOptions);
  }

}
