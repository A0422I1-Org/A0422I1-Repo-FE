import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ActivatedRoute, ParamMap, Params, Router} from "@angular/router";
import {MovieService} from "../../../service/movie/movie.service";
import {MovieListDTO} from "../dto/MovieListDTO";
import {Observable, Subscription} from "rxjs";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-user-movie-list',
  templateUrl: './user-movie-list.component.html',
  styleUrls: ['./user-movie-list.component.css']
})
export class UserMovieListComponent implements OnInit {

  movieList: MovieListDTO[];

  name_search: string = '';

  trustedUrl: SafeResourceUrl;

  condition: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private sanitizer: DomSanitizer,
              private movieService: MovieService,
              ) {

  }

  ngOnInit(): void {
    this.findAllOnShowing()
    this.findAllUpcoming();
  }



  findAllOnShowing(){
    this.movieService.getOnShowingMovie().subscribe(value => {
      this.movieList = value;
      console.log(value)
    })
  }

  findAllUpcoming(){
    this.movieService.getUpCommingMovie().subscribe(value => {
      this.movieList = value;
      console.log(value)
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

}
