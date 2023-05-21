import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SecurityService} from "../../../service/security/security.service";
import {TokenStorageService} from "../../../service/token/token-storage.service";
import {ShareService} from "../../../service/share/share.service";

//import-google-login
import {Token} from "../../../model/token";
import {OauthService} from "../../../service/google-login/oauth.service";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {ToastrService} from "ngx-toastr";


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
  loggedIn: boolean = false;

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
    /** Pham Trung Hieu
     * Check tinh trang dang nhap, neu da dang nhap thi ve trang truoc do, chua se ve lai login
     */
  if (!this.tokenStorageService.isLogged()) {
      this.router.navigate(['/login'])
    }

    this.formGroup = this.formBuild.group({
      username:['', [Validators.required,
        Validators.minLength(4), Validators.maxLength(55),
        Validators.pattern('^[a-zA-Z0-9]+$')]],
      password:['', [Validators.required,
        Validators.minLength(8), Validators.maxLength(55),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]+$')]],
      remember_me:['']
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl']

    if (this.tokenStorageService.getToken()) {
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
      console.log(this.roles+" and "+this.username);
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
console.log(data);
        if (this.formGroup.value.remember_me) {
          this.tokenStorageService.saveTokenLocal(data.token);
          this.tokenStorageService.saveUserLocal(data);
        } else {
          this.tokenStorageService.saveTokenSession(data.token);
          this.tokenStorageService.saveUserLocal(data);
        }

        this.username = this.tokenStorageService.getUser().username;
        this.roles = this.tokenStorageService.getUser().roles;
        this.formGroup.reset();
        this.router.navigateByUrl(data.roles[0] == "ROLE_ADMIN" ? "/ticket_management/select_ticket_user":data.roles[0] == "ROLE_EMPLOYEE"?"/ticket_management/select_ticket_user":"trang chu").then(r => console.log(r));
        this.shareService.sendClickEvent();
        this.loggedIn=this.tokenStorageService.isLogged();
      },
      err => {
        this.toastr.error("Sai tên đăng nhập hoặc mật khẩu không chính xác. Hoặc tài khoản chưa được kích hoạt, vui lòng đăng nhập lại", "Đăng nhập thất bại: ",{
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
            this.loggedIn = this.tokenStorageService.isLogged();
            this.router.navigateByUrl(this.returnUrl).then(r => console.log(r));
          },
          err => {
            console.log(err);
          }
        );
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }
}
