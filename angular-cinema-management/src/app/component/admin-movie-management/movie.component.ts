import { Component, OnInit } from '@angular/core';
import {MovieServiceService} from "./service/movie-service.service";
import {MovieDTOView} from "./dto/movieDTOView";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
