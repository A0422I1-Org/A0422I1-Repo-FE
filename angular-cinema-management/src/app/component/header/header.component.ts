import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {MovieService} from "../../service/movie/movie.service";
import {TokenStorageService} from "../../service/token/token-storage.service";
import {Customer} from "../../model/customer";
import {CustomerService} from "../../service/customer/customer.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  customer: Customer;
  selection: string;
  movieListVisible: boolean = false;


  constructor(
    private router: Router,
    private movieService: MovieService,
    private token: TokenStorageService,
    private customerService: CustomerService
  ) {
  }

  ngOnInit(): void {
    this.movieService.currentSelection.subscribe(selection => {
      this.selection = selection;
    });
    this.movieService.movieListVisible.subscribe(visible => {
      this.movieListVisible = visible;
    });
    this.customerService.findByUsername(this.token.getUser().username).subscribe(next => {
      this.customer = next;
    })
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

  logout() {
    this.token.signOut();
    this.router.navigateByUrl("/login");
  }
}
