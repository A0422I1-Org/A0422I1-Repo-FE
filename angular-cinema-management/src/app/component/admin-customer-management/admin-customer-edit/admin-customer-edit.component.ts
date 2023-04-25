import {Component, OnInit} from '@angular/core';
import {Customer} from "../../../model/customer";
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../../../service/customer/customer.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin-customer-edit',
  templateUrl: './admin-customer-edit.component.html',
  styleUrls: ['./admin-customer-edit.component.css']
})
export class AdminCustomerEditComponent implements OnInit {
  customer: Customer = null;
  id: string;
  formGroup: FormGroup = new FormGroup({
    username: new FormControl('', []),
    fullName: new FormControl('', [Validators.required,
      Validators.pattern('^([a-zA-Z][ ]{1})*[a-zA-Z]$')]),
    password: new FormControl(),
    birthday: new FormControl(),
    gender: new FormControl(),
    email: new FormControl(),
    cardId: new FormControl(),
    phoneNumber: new FormControl(),
    address: new FormControl()
  });

  constructor(private customerService: CustomerService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(next => {
      this.id = next.get('id');
      console.log(this.id)
    });
  }

  ngOnInit(): void {
      this.customerService.getCustomerById(this.id).subscribe(next => {
        this.customer = next;
        this.formGroup = new FormGroup({
          username: new FormControl(next.account.username, []),
          fullName: new FormControl(next.fullName, [Validators.required,
            Validators.pattern('^([a-zA-Z][ ]{1})*[a-zA-Z]$')]),
          password: new FormControl(next.account.password),
          birthday: new FormControl(next.birthday),
          gender: new FormControl(next.gender),
          email: new FormControl(next.email),
          cardId: new FormControl(next.cardId),
          phoneNumber: new FormControl(next.phoneNumber),
          address: new FormControl(next.address)
        })
      })
  };

  submit() {

  }
}
