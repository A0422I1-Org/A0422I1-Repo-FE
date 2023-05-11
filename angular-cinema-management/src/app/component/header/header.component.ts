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

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.movieService.currentSelection.subscribe(selection => {
      this.selection = selection;
    });

  }

  toOnShowingList(){
    this.movieService.changeSelection("on-showing");
  }

  toUpcomingList(){
    this.movieService.changeSelection("upcoming");
  }
}
