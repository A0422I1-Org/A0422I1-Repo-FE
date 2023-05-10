import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AccountService} from "../../../service/account/account.service";
import {comparePassword} from "../../../validator/comparePassword";

@Component({
  selector: 'app-admin-customer-edit',
  templateUrl: './admin-customer-edit.component.html',
  styleUrls: ['./admin-customer-edit.component.css']
})
export class AdminCustomerEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }



}
