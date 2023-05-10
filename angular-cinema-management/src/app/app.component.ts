import { Component } from '@angular/core';
import {TicketService} from "./service/ticket/ticket.service";
import {CustomerService} from "./service/customer/customer.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {TokenStorageService} from "./service/token/token-storage.service";
import {SecurityService} from "./service/security/security.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-cinema-management';

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    console.log(this.token.getUser().username)
  }
}
