import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MovieService} from "../../../service/movie/movie.service";
import {MovieListDTO} from "../dto/MovieListDTO";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-user-moive-list',
  templateUrl: './user-moive-list.component.html',
  styleUrls: ['./user-moive-list.component.css']
})
export class UserMoiveListComponent implements OnInit {

  movieList: MovieListDTO[];

  name_search: string = '';

  trustedUrl: SafeResourceUrl;


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


}
