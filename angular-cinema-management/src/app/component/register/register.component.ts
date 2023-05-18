import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../service/account/account.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {checkDateOfBirth} from "./checkDateOfBirth";
import {comparePassword} from "./comparePassword";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupRequestForm: FormGroup;
  constructor(private accountService: AccountService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.signupRequestForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      password: new FormControl('', [Validators.required, Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")]),
      confirmPassword: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern("^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$")]),
      birthday: new FormControl('', [Validators.required, checkDateOfBirth]),
      gender: new FormControl('', [Validators.required]),
      cardId: new FormControl('', [Validators.required, Validators.pattern("[0-9]{9}")]),
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern("^\\w{5,}.?\\w+(@\\w{3,8})(.\\w{3,8})+$")]),
      address: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^(0\\d{9,10})$")]),
    }, {
      validators: comparePassword
    });
  }

  getSignupRequest() {
    const signupRequest = this.signupRequestForm.value;
    console.log(signupRequest);
    this.accountService.register(signupRequest).subscribe(data => {
        this.toastr.success("Đăng ký tài khoản thành công!", "Thông báo");
        this.signupRequestForm.reset();
      },
      err => {
        this.toastr.error("Tài khoản, email, số điện thoại đã được đăng ký!", "Thông báo");
      }
    )
  }

}
