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
  pageNumber = 0;
  totalPages = 0;
  totalElements = 0;
  statusSort = "desc"

  movieChart: Chart;
  barColors: string[] = [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    "#67d44c",
    '#4a185e',
    '#a82aa2',
    '#d4206b',
    'rgb(153, 102, 255)',];
  borderColor: [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
  ]


  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.getMovieStatisticListPaging(this.pageNumber, "", this.statusSort);
  }

  getMovieStatisticListPaging(page: number, movieName: string, statusSort: string) {
    this.movieService.getMovieStatisticListPaging(page, movieName, statusSort).subscribe(list => {
      this.movieStatisticList = list.content;
      this.pageNumber = list.number;
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


  createChart() {
    if (this.movieChart != undefined) {
      this.movieChart.destroy();
    }
    this.movieChart = new Chart("movieChart", {
      type: "bar",
      data: {
        labels: this.movieStatisticList.map((item) => item.name),
        datasets: [{
          backgroundColor: this.barColors,
          borderColor: this.borderColor,
          borderWidth: 2,
          data: this.movieStatisticList.map((item) => item.totalTicket),
          label: ''
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
          }
        },
        scales: { //Title Configuration
          y: {
            display: true,
            title: {
              display: true,
              text: 'Số vé đã bán',
              color: '#F26c38',
              font: {
                family: 'tahoma',
                size: 20,
                style: 'normal',
                lineHeight: 1.0
              },
            }
          }
        }
      }
    });
  }


}
