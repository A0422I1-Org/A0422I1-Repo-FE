import { Component, OnInit } from "@angular/core";
import { MovieService } from "../../../service/movie/movie.service";
import { Movie } from "../../../model/movie";
import { Showtime } from "../../../model/showtime";
import { ShowtimeService } from "../../../service/showtime/showtime.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-movie-and-showtime-selection",
  templateUrl: "./movie-and-showtime-selection.component.html",
  styleUrls: ["./movie-and-showtime-selection.component.css"],
})
export class MovieAndShowtimeSelectionComponent implements OnInit {
  movies: Movie[] = [];
  showTimesByIdMovie: Showtime[] = [];
  showTimeByDate: Showtime[] = [];
  selectedMovieId: number;
  selectedTimeOfShowTime: any;
  getSoldOut: any;
  getIdShowTimeSelect: any;

  constructor(
    private movieService: MovieService,
    private showtimeService: ShowtimeService,
    private activeRouter: ActivatedRoute,
    private router: Router
  ) {
    this.selectedMovieId = parseInt(
      this.activeRouter.snapshot.queryParamMap.get("movieId")
    );
    if (this.selectedMovieId) {
      this.getShowtimeMovie(this.selectedMovieId);
    }
  }
  ngOnInit(): void {
    this.getAllMovie();
  }

  getAllMovie() {
    this.movieService.getAllMovie().subscribe(
      (next) => {
        this.movies = next;
      },
      (error) => {},
      () => {}
    );
  }

  getShowtimeMovie(id: number) {
    this.showtimeService.getShowtimeByIdMovie(id).subscribe(
      (next) => {
        this.showTimesByIdMovie = next;
        this.showTimeByDate = this.groupShowtimesByDate(
          this.showTimesByIdMovie
        );
        if (this.showTimeByDate.length > 5) {
          this.showTimeByDate = this.showTimeByDate.slice(0, 5);
        }
      },
      (error) => {},
      () => {
        // lấy id để kích hoạt ngClass
        this.selectedMovieId = id;
        this.resetShowTimesEventSelectMovie();
      }
    );
  }

  // reset lại event ngClass khi thay đổi chọn phim
  resetShowTimesEventSelectMovie() {
    this.selectedTimeOfShowTime = null;
    this.getIdShowTimeSelect = null;
  }

  // lấy suất chiếu của từng ngày khác nhau
  groupShowtimesByDate(showtimes: any[]) {
    const groupedShowtimes =  [];
    const uniqueDates = showtimes
      .map((showtime) => showtime.date)
      .filter((date, index, self) => self.indexOf(date) === index);
    uniqueDates.forEach((date) => {
      const times = showtimes.filter((showtime) => showtime.date === date);
      times.sort((a, b) => {
        if (a.startTime < b.startTime) {
          return -1;
        } else if (a.startTime > b.startTime) {
          return 1;
        } else {
          return 0;
        }
      });
      groupedShowtimes.push({ date, times });
    });
    return groupedShowtimes;
  }
  // lấy dữ liệu để so sánh điều kiện ngClass khi chọn suất chiếu
  selectTime(time: any, sholdOut: number, idShowTime: number) {
    this.selectedTimeOfShowTime = time;
    this.getSoldOut = sholdOut;
    this.getIdShowTimeSelect = idShowTime;
  }

  checkSoldOut(sholdOut: number): boolean {
    if (sholdOut == 1) {
      return false;
    } else return true;
  }
  submitSelectMovieAndShowTime() {
    if (true) {
      // check select movie
      if (this.selectedMovieId) {
        // check select showtime
        if (this.selectedTimeOfShowTime && this.getIdShowTimeSelect) {
          //check sold out
          if (this.checkSoldOut(this.getSoldOut)) {
            this.router.navigate(["/booking/select-seat"], {
              queryParams: { showTimeId: this.getIdShowTimeSelect },
            });
          } else {
            this.changeAlertPosition('Suất chiếu hiện tại đã hết ghế !');
          }
        } else {
          this.changeAlertPosition('Vui lòng chọn suất chiếu');
        }
      } else {
         this.changeAlertPosition('Vui lòng chọn phim');
      }
    } else {
      alert("Vui lòng đăng nhập");
    }
  }
  changeAlertPosition(notification:string){
    Swal.fire({
      position: 'top',
      icon: 'warning',
      title: notification,
      showConfirmButton: true,
      confirmButtonText:'OK',
      showCloseButton: true,
    })
  }
}
