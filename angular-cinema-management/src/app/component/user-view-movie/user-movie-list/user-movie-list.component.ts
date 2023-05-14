import {Component, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../../service/movie/movie.service";
import {MovieListDTO} from "../dto/MovieListDTO";
import {TokenStorageService} from "../../../service/token/token-storage.service";
import {SecurityService} from "../../../service/security/security.service";

@Component({
  selector: 'app-user-movie-list',
  templateUrl: './user-movie-list.component.html',
  styleUrls: ['./user-movie-list.component.css']
})
export class UserMovieListComponent implements OnInit, OnDestroy{

  movieList: MovieListDTO[];

  name_search: string = '';

  trustedUrl: SafeResourceUrl;

  selection: string;

  showBookingButton = false;
  username :string;
  roles: string[] = [];
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private sanitizer: DomSanitizer,
              private movieService: MovieService,
              private token: TokenStorageService,
              private tokenStorageService: TokenStorageService,
              private securityService: SecurityService
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
    this.movieService.setMovieListVisible(true);
    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.securityService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
    }
  }

  ngOnDestroy(){
    this.movieService.setMovieListVisible(false);
  }

  findAllOnShowing(){
    this.movieService.getOnShowingMovie().subscribe(value => {
      this.movieList = value;
      console.log(value);
    })
  }

  findAllUpcoming(){
    this.movieService.getUpComingMovie().subscribe(value => {
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
    if (this.username == null) {
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigate(['/booking/select-movie-and-showtime'],
        {queryParams: {movieId: movieId}});
    }
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