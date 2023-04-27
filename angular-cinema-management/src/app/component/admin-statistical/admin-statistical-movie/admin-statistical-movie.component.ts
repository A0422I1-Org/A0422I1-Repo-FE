import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../../service/movie/movie.service";
import {MovieStatisti} from "../../../model/MovieStatisti";
import Chart from "chart.js/auto";


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

  statusChart = true;
  movieChart: Chart;


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
      this.createChart();
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

  displayChart() {
    if (this.statusChart) {
      this.statusChart = false
    } else {
      this.statusChart = true
    }
  }

  createChart() {
    if (this.movieChart != undefined) {
      this.movieChart.destroy();
    }
    this.movieChart = new Chart("movieChart", {
      type: "bar",
      data: {
        labels: this.movieStatisticList.map((item) => item.name),
        datasets: [
          {
            backgroundColor: '#F26B38',
            borderWidth: 1,
            data: this.movieStatisticList.map((item) => item.totalTicket),
            label: 'Số lượng vé bán được'
          }]
      },
      options: {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Thống Kê Phim'
          }
        }
      },
    });
  }


}
