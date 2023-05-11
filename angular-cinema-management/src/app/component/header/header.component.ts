import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {MovieService} from "../../service/movie/movie.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  selection: string;
  movieListVisible: boolean = false;


  constructor(
    private router: Router,
    private movieService: MovieService
  ) {
  }

  ngOnInit(): void {
    this.movieService.currentSelection.subscribe(selection => {
      this.selection = selection;
    });
    this.movieService.movieListVisible.subscribe(visible => {
      this.movieListVisible = visible;
    });
  }

  toOnShowingList() {
    this.movieService.changeSelection("on-showing");
    if (!this.movieListVisible) {
      this.router.navigateByUrl('/movie/list');
    }
  }

  toUpcomingList() {
    this.movieService.changeSelection("upcoming");
    if (!this.movieListVisible) {
      this.router.navigateByUrl('/movie/list');
    }
  }

  toPromotion() {
    this.router.navigateByUrl('/promotion');
  }

  toBooking() {
    this.router.navigateByUrl('/booking/select-movie-and-showtime');
  }
}
