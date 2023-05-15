import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {TokenStorageService} from "../token/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     // if (this.tokenStorageService.isLogged() && this.tokenStorageService.getUser().roles[0] == "ROLE_ADMIN") {
    //   return true;
    // }
    // if (this.tokenStorageService.isLogged() && this.tokenStorageService.getUser().roles[0] == "ROLE_EMPLOYEE") {
    //   return true;
    // }
    // if (this.tokenStorageService.isLogged() && this.tokenStorageService.getUser().roles[0] == "ROLE_CUSTOMER") {
    //   return true;
    // } else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    if(this.tokenStorageService.getToken() == null) {
      this.router.navigate(['/login']).then(r => console.log(r));
      return;
    }
    if(this.tokenStorageService.isLogged()){
      switch (this.tokenStorageService.getUser().roles[0]) {
        case "ROLE_ADMIN":


        case "ROLE_EMPLOYEE":

        case "ROLE_CUSTOMER":
            return  true;
        default:
          this.router.navigate(['/login']).then(r => console.log(r));
          return  false;}
    }
    this.router.navigate(['/login']).then(r => console.log(r));
    return false;
  }
}
