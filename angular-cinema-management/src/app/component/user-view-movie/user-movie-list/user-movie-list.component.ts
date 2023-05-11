import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../../service/movie/movie.service";
import {MovieListDTO} from "../dto/MovieListDTO";

@Component({
  selector: 'app-user-movie-list',
  templateUrl: './user-movie-list.component.html',
  styleUrls: ['./user-movie-list.component.css']
})
export class UserMovieListComponent implements OnInit{

  movieList: MovieListDTO[];

  name_search: string = '';

  trustedUrl: SafeResourceUrl;

  selection: string;

  showBookingButton = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private sanitizer: DomSanitizer,
              private movieService: MovieService,
              ) {
  }

  ngOnInit(): void {
    this.movieService.currentSelection.subscribe(selection => {
      this.selection = selection;
      // get movie list with selection
      if (selection.includes('on-showing')){
        this.findAllOnShowing()
      }
      else {
        this.findAllUpcoming();
      }
    });
  }

  findAllOnShowing(){
    this.movieService.getOnShowingMovie().subscribe(value => {
      this.movieList = value;
      console.log(value);
    })
  }

  findAllUpcoming(){
    this.movieService.getUpCommingMovie().subscribe(value => {
      this.movieList = value;
      console.log(value);
    })
  }

  findByName(name: string){
    this.movieService.getMovieByName(name).subscribe(value => {
      this.movieList = value;
    })
  }

  movieDetail(id: number) {
    this.router.navigateByUrl('/movie/detail/' + id);

  }

  booking(movieId: number) {
    this.router.navigate(['/booking/select-movie-and-showtime'],
      {queryParams: {movieId: movieId}});
  }

  bookingPermit(startDay: string) {
    const date = new Date(startDay);
    const today = new Date();

    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 3) {
      this.showBookingButton = true;
    } else {
      this.showBookingButton = false;
    }
  }
}
