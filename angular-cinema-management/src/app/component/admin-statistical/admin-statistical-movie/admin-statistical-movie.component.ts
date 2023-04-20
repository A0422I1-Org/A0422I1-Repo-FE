import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../../service/movie/movie.service";
import {callJSFun} from "../../../../assets/statistical-movie-and-customer/js/chart.js";
import {Movie} from "../../../model/movie";
import {MovieStatisti} from "../../../model/MovieStatisti";
import {Observable} from "rxjs";

@Component({
  selector: 'app-admin-statistical-movie',
  templateUrl: './admin-statistical-movie.component.html',
  styleUrls: ['./admin-statistical-movie.component.css'],
})
export class AdminStatisticalMovieComponent implements OnInit {
  movieStatisticList: MovieStatisti[] = [];
  checkSort = false;

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.getMovieStatisticList()
  }

  getMovieStatisticList() {
    this.movieService.getMovieStatisticList().subscribe(list => {
      this.movieStatisticList = list;
    })
  }

  callJSChart() {
    callJSFun();
  }

  getMovieStatisticListAcs() {
    if (this.checkSort === true) {
      this.checkSort = false;
      this.getMovieStatisticList();
      return;
    } else if (this.checkSort === false) {
      this.movieService.getMovieStatisticListAcs().subscribe(list => {
        this.movieStatisticList = list;
        this.checkSort = true;
        return
      })
    }
  }

  searchMovieByName(nameMovie: string) {
    this.movieService.searchMovieStatisticListByName(nameMovie).subscribe(list => {
      this.movieStatisticList = list;
    })
  }
}
