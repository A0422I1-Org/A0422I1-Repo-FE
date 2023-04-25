import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../../service/movie/movie.service";
import {MovieStatisti} from "../../../model/MovieStatisti";



@Component({
  selector: 'app-admin-statistical-movie',
  templateUrl: './admin-statistical-movie.component.html',
  styleUrls: ['./admin-statistical-movie.component.css'],
})
export class AdminStatisticalMovieComponent implements OnInit {

  movieStatisticList: MovieStatisti[] = [];
  indexPagination = 0;
  totalPages = 0;
  totalElements = 0;
  statusSort = "desc"

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.getMovieStatisticListPaging(this.indexPagination, "", this.statusSort);

  }

  getMovieStatisticListPaging(page: number, movieName: string, statusSort: string) {
    this.movieService.getMovieStatisticListPaging(page, movieName, statusSort).subscribe(list => {
      this.movieStatisticList = list.content;
      this.indexPagination = list.number;
      this.totalPages = list.totalPages;
      this.totalElements = list.totalElements;
    })
  }

  sortMovieByTicket(page: number, movieName: string, statusSort: string) {

    if (movieName != "" && statusSort == 'desc') {
      this.statusSort = 'acs'
      return this.getMovieStatisticListPaging(page, movieName, this.statusSort);
    } else if (movieName != "" && statusSort == 'acs') {
      this.statusSort = 'desc'
      return this.getMovieStatisticListPaging(page, movieName, this.statusSort);
    }

    if (statusSort == 'desc') {
      this.statusSort = 'acs'
      return this.getMovieStatisticListPaging(page, movieName, this.statusSort);
    } else if (statusSort == 'acs') {
      this.statusSort = 'desc'
      return this.getMovieStatisticListPaging(page, movieName, this.statusSort);
    }
  }

  getPageChoice(page, movieName: string) {
    if (this.validPage(page)) {
      this.getMovieStatisticListPaging(page, movieName, "");
    }
  }

  validPage(page: number) {
    if (page >= this.totalPages || page < 0) {
      (document.getElementById("input-page-choice") as HTMLInputElement).value = "";
      return false;
    }
    if (isNaN(Number(page))) {
      (document.getElementById("input-page-choice") as HTMLInputElement).value = "";
    }
    return true;
  }


}
