import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MovieService} from "../../service/movie/movie.service";
import {TokenStorageService} from "../../service/token/token-storage.service";
import {Customer} from "../../model/customer";
import {CustomerService} from "../../service/customer/customer.service";
import {ShareService} from "../../service/share/share.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SocialAuthService, SocialUser} from "angularx-social-login";
import {SecurityService} from "../../service/security/security.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  customer: Customer;
  selection: string;
  movieListVisible: boolean = false;

  userLogged: SocialUser;
  returnUrl: string;
  username: string;
  currentUser: string;
  role: string;
  loggedIn: boolean = false;
  hasLoggedIn: boolean = false;
  roles: string[] = [];

  constructor(
    private router: Router,
    private movieService: MovieService,
    private token: TokenStorageService,
    private customerService: CustomerService,
    private tokenStorageService: TokenStorageService,
    private shareService: ShareService,
    private authService: SocialAuthService,
    private securityService: SecurityService,
    private route: ActivatedRoute,
  ) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    })
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
    });


    this.returnUrl = this.route.snapshot.queryParams['returnUrl']

    this.loadHeader();

    this.authService.authState.subscribe(
      data => {
        this.userLogged = data;
        this.loggedIn = (this.userLogged != null);
        console.log(this.loggedIn);
      }
    );
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
    this.router.navigate(["/login"]);
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.currentUser = this.tokenStorageService.getUser().username;
      this.role = this.tokenStorageService.getUser().roles[0];
      this.username = this.tokenStorageService.getUser().username;
    }
    this.hasLoggedIn = this.tokenStorageService.isLogged();
    this.getUsernameAccount();
  }

  logOut() {
    this.tokenStorageService.signOut();
    if (!this.tokenStorageService.isLogged()) {
      this.router.navigateByUrl(this.returnUrl);
      console.log("Đã đăng xuất");
      this.loadHeader();
    }
  }


  signOut(): void {
    this.authService.signOut().then(
      data => {
        this.router.navigateByUrl(this.returnUrl);
        console.log("Đã đăng xuất");

      }
    );
  }

  getUsernameAccount() {
    if (this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser().username;
    }
  }
}
