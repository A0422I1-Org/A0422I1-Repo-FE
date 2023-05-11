import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../service/token/token-storage.service";
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

  userLogged: SocialUser;
  returnUrl: string;
  username: string;
  currentUser: string;
  role: string;
  loggedIn: boolean = false;
  hasLoggedIn: boolean = false;
  roles: string[] = [];

  constructor(private tokenStorageService: TokenStorageService,
              private shareService : ShareService,
              private router: Router,
              private authService: SocialAuthService,
              private securityService: SecurityService,
              private route: ActivatedRoute,) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    })
  }

  ngOnInit(): void {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl']

    this.loadHeader();

    this.authService.authState.subscribe(
      data => {
        this.userLogged = data;
        this.loggedIn = (this.userLogged != null);
      }
    );
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.currentUser = this.tokenStorageService.getUser().username;
      this.role = this.tokenStorageService.getUser().roles[0];
      this.username = this.tokenStorageService.getUser().username;
    }
    this.hasLoggedIn = this.username != null;
    this.getUsernameAccount();
  }

  logOut() {
    this.tokenStorageService.signOut();
    this.loadHeader();
  }


  signOut(): void {
    this.authService.signOut().then(
      data => {
        this.router.navigateByUrl(this.returnUrl);
        console.log("Đã đăng xuất");
      }
    );
  }

  getUsernameAccount(){
    if (this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser().username;
    }
  }
}
