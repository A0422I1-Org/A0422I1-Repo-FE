import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../../service/movie/movie.service";
import {Movie} from "../../../model/movie";
import {Showtime} from "../../../model/showtime";
import {ShowtimeService} from "../../../service/showtime/showtime.service";

@Component({
  selector: 'app-movie-and-showtime-selection',
  templateUrl: './movie-and-showtime-selection.component.html',
  styleUrls: ['./movie-and-showtime-selection.component.css']

})
export class MovieAndShowtimeSelectionComponent implements OnInit {

  movies: Movie[] = [];
  showTimesByIdMovie: Showtime[] = [];

  constructor(private movieService: MovieService, private showtimeService: ShowtimeService) {
  }

  ngOnInit(): void {
    this.getAllMovie();
  }

  getAllMovie() {
    this.movieService.getAllMovie().subscribe(next => {
        this.movies = next;
      },
      error => {
      },
      () => {
      })
  }

  getShowtimeMovie(id: number) {
    this.showtimeService.getShowtimeByIdMovie(id).subscribe(next => {
        console.log(next);
        this.showTimesByIdMovie = next;
      },
      error => {
      },
      () => {
      })
  }
}
