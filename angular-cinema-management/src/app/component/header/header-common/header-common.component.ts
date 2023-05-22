import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MovieService} from "../../../service/movie/movie.service";
import {TokenStorageService} from "../../../service/token/token-storage.service";
import {Customer} from "../../../model/customer";
import {CustomerService} from "../../../service/customer/customer.service";
import {ShareService} from "../../../service/share/share.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SocialAuthService, SocialUser} from "angularx-social-login";
import {SecurityService} from "../../../service/security/security.service";
import {Employee} from "../../../model/employee";

@Component({
  selector: 'app-header',
  templateUrl: './header-common.component.html',
  styleUrls: ['./header-common.component.css']
})
export class HeaderCommonComponent implements OnInit {

  nameOfUser: string;
  customer: Customer;
  selection: string;
  movieListVisible: boolean = false;
  employee: Employee;

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
    private customerService: CustomerService,
    private tokenStorageService: TokenStorageService,
    private shareService: ShareService,
    private authService: SocialAuthService,
    private securityService: SecurityService,
    private route: ActivatedRoute,
  ) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
  }

  ngOnInit(): void {
    this.movieService.currentSelection.subscribe(selection => {
      this.selection = selection;
    });
    this.movieService.movieListVisible.subscribe(visible => {
      this.movieListVisible = visible;
    });

    if (this.tokenStorageService.isLogged()) {
      if (this.tokenStorageService.getUser().roles[0] == "ROLE_CUSTOMER") {
        this.securityService.findCustomerByUsername(this.tokenStorageService.getUser().username).subscribe(next => {
          this.customer = next;
          this.nameOfUser = this.customer.fullName;
        });
      } else if (this.tokenStorageService.getUser().roles[0] == "ROLE_EMPLOYEE"){
        this.securityService.findEmployeeByUsername(this.tokenStorageService.getUser().username).subscribe(next => {
          this.employee = next;
          this.nameOfUser = this.employee.fullName;
        });
      }
    } else { }

    if (this.tokenStorageService.getToken()) {
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl']

    this.loadHeader();

    this.authService.authState.subscribe(
      data => {
        this.userLogged = data;
        this.loggedIn = (this.userLogged != null);
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
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  signOut(): void {
    this.authService.signOut().then(
      data => {
        // window.location.reload();
        console.log("Đã đăng xuất")
      }
    );
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

  getUsernameAccount() {
    if (this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser().username;
    }
  }

  toLogin() {
    this.router.navigate(["/login"]);
  }
}
