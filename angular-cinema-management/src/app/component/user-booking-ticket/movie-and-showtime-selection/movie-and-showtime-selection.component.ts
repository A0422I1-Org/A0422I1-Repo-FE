import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../../service/movie/movie.service";
import {Movie} from "../../../model/movie";

@Component({
  selector: 'app-movie-and-showtime-selection',
  templateUrl: './movie-and-showtime-selection.component.html',
  styleUrls: ['./movie-and-showtime-selection.component.css']

})
export class MovieAndShowtimeSelectionComponent implements OnInit {

  movies: Movie[] = [];

  constructor(private movieService: MovieService) {

  }

  ngOnInit(): void {
    this.movieService.getAllMovie().subscribe(data => {
      console.log(data);
      this.movies = data;
    })
  }


  getShowtimeMovie(id: number) {
    console.log(id);
  }
}
