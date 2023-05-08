import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoryStatistic} from "../../model/category-statistic";
import {Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class MovieTypeService {

  constructor(private httpClient: HttpClient ,
              private toastr: ToastrService) {
  }

  statisticCategoryMovie(): Observable<CategoryStatistic[]> {
    return this.httpClient.get<CategoryStatistic[]>('http://localhost:8080' + '/api/admin/category-movie');
  }
  statisticCategoryMovieNonGroupBy(): Observable<CategoryStatistic[]> {
    return this.httpClient.get<CategoryStatistic[]>('http://localhost:8080' + '/api/admin/category-movie');
  }

}
