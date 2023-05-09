import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {SecurityService} from "../../../service/security/security.service";
import {TokenStorageService} from "../../../service/token/token-storage.service";
import {ShareService} from "../../../service/share/share.service";

//import-google-login
import {SocialAuthService, SocialUser} from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import {Token} from "../../../model/token";
import {OauthService} from "../../../service/google-login/oauth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  username: string;
  roles: string[] = [];
  returnUrl: string;

  //google-login
  userLogged: SocialUser;
  socialUser: SocialUser;
  loggedIn: boolean;
  hasLoggedIn: boolean;

  constructor(private formBuild: FormBuilder,
              private tokenStorageService: TokenStorageService,
              private securityService: SecurityService,
              private router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private shareService: ShareService,
              private authService: SocialAuthService,
              private oauthService: OauthService,) { }

  ngOnInit(): void {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl']

    this.formGroup = this.formBuild.group({
      username:[''],
      password:[''],
      remember_me:['']
    });

    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.securityService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
      this.hasLoggedIn = this.securityService.isLoggedIn;
    }

    this.authService.authState.subscribe(
      data => {
        this.userLogged = data;
        this.loggedIn = (this.userLogged != null);
      }
    );
  }

  onSubmit() {
    this.securityService.login(this.formGroup.value).subscribe(
      data => {

        if (this.formGroup.value.remember_me) {
          this.tokenStorageService.saveTokenLocal(data.accessToken);
          this.tokenStorageService.saveUserLocal(data);
        } else {
          this.tokenStorageService.saveTokenSession(data.accessToken);
          this.tokenStorageService.saveUserLocal(data);
        }

        this.securityService.isLoggedIn = true;
        this.username = this.tokenStorageService.getUser().username;
        this.roles = this.tokenStorageService.getUser().roles;
        this.formGroup.reset();
        this.router.navigateByUrl(this.returnUrl);
        this.shareService.sendClickEvent();
        this.hasLoggedIn = (this.username != null);

        console.log("username is "+this.username+" role is "+this.roles);

      },
      err => {
        this.securityService.isLoggedIn = false;
        this.toastr.error("Sai tên đăng nhập hoặc mật khẩu hoặc tài khoản chưa được kích hoạt", "Đăng nhập thất bại: ",{
          timeOut: 3000,
          extendedTimeOut: 1500
        });

      }

    );
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        console.log(this.socialUser.idToken);
        const tokenGoogle = new Token(this.socialUser.idToken);
        this.oauthService.google(tokenGoogle).subscribe(
          res => {
            this.tokenStorageService.saveUserLocal(res.value);
            this.loggedIn = true;
            this.router.navigate(['/login']);
          },
          err => {
            console.log(err);
            // this.logOut();
          }
        );
      }
    ).catch(
      err => {
        this.oauthService.hasLoggedIn = false;
        this.toastr.error("Sai tên đăng nhập hoặc mật khẩu hoặc tài khoản chưa được kích hoạt", "Đăng nhập thất bại: ",{
          timeOut: 3000,
          extendedTimeOut: 1500
        })
        console.log(err);
      }
    );
  }

  signOut(): void {
    this.authService.signOut().then(
      data => {
        this.router.navigate(['/login']);
        console.log("Đã đăng xuất");
      }
    );
  }

  logOut(): void {
    this.tokenStorageService.signOut();
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
}
