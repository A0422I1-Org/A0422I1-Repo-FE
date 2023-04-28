import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoryStatistic} from "../../model/category-statistic";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MovieTypeService {

  constructor(private httpClient: HttpClient) {
  }

  statisticCategoryMovie(): Observable<CategoryStatistic[]> {
    return this.httpClient.get<CategoryStatistic[]>('http://localhost:8080' + '/api/admin/category-movie');
  }
  statisticCategoryMovieNonGroupBy(): Observable<CategoryStatistic[]> {
    return this.httpClient.get<CategoryStatistic[]>('http://localhost:8080' + '/api/admin/category-movie');
  }

}
