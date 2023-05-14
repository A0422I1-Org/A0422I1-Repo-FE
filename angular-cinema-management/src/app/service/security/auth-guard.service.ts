import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {TokenStorageService} from "../token/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.tokenStorageService.isLogged() && this.tokenStorageService.getUser().role == "ROLE_ADMIN") {
      return true;
    } if (this.tokenStorageService.isLogged() && this.tokenStorageService.getUser().role == "ROLE_EMPLOYEE") {
      return true;
    } if (this.tokenStorageService.isLogged() && this.tokenStorageService.getUser().role == "ROLE_CUSTOMER") {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
    }
}
