import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../service/token/token-storage.service";
import {Router} from "@angular/router";
import {Customer} from "../../model/customer";
import {CustomerService} from "../../service/customer/customer.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  customer: Customer;

  constructor(private token: TokenStorageService,
              private router: Router,
              private customerService: CustomerService
            ) {}

  ngOnInit(): void {
    this.customerService.findByUsername(this.token.getUser().username).subscribe(next => {
      this.customer = next;
    })
  }

  logout() {
    this.token.signOut();
    this.router.navigate(['/login']);
  }
}
