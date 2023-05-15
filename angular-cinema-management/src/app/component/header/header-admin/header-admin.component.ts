import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../../service/movie/movie.service";
import {TokenStorageService} from "../../../service/token/token-storage.service";
import {CustomerService} from "../../../service/customer/customer.service";
import {ShareService} from "../../../service/share/share.service";
import {SocialAuthService, SocialUser} from "angularx-social-login";
import {SecurityService} from "../../../service/security/security.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  formGroup: FormGroup;
  username: string;
  roles: string[] = [];
  returnUrl: string;

  //google-login
  userLogged: SocialUser;
  socialUser: SocialUser;
  loggedIn: boolean = false;

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

    // this.customerService.findByUsername(this.token.getUser().username).subscribe(next => {
    //   this.customer = next;
    // });


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
  logout() {
    this.token.signOut();
    this.router.navigate(["/login"]);
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      // this.currentUser = this.tokenStorageService.getUser().username;
      // this.role = this.tokenStorageService.getUser().roles[0];
      this.username = this.tokenStorageService.getUser().username;
    }
    // this.hasLoggedIn = this.tokenStorageService.isLogged();
    // this.getUsernameAccount();
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
