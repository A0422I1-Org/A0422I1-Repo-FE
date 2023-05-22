import {Component, OnInit} from '@angular/core';
import {Customer} from "../../../model/customer";
import {CustomerService} from "../../../service/customer/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admin-customer-edit',
  templateUrl: './admin-customer-edit.component.html',
  styleUrls: ['./admin-customer-edit.component.css']
})
export class AdminCustomerEditComponent implements OnInit {
  customer: Customer;
  id: string;
  isDelete: boolean;
  errorMessage: string;

  formGroup: FormGroup = new FormGroup({
    username: new FormControl(),
    fullName: new FormControl(),
    password: new FormControl(),
    birthday: new FormControl(),
    gender: new FormControl(),
    email: new FormControl(),
    cardId: new FormControl(),
    phoneNumber: new FormControl(),
    address: new FormControl()
  });
  today: Date;

  constructor(private customerService: CustomerService, private activatedRoute: ActivatedRoute, private router: Router,
              private toastr: ToastrService) {
    this.activatedRoute.paramMap.subscribe(next => {
      this.id = next.get('id');
    });

  }

  ngOnInit(): void {
    this.customerService.getCustomerById(this.id).subscribe(next => {
      this.customer = next;
      this.isDelete = next.isDelete;
      this.today = new Date();
      console.log(this.today);
      this.formGroup = new FormGroup({
        username: new FormControl(next.account.username),
        fullName: new FormControl(next.fullName, [Validators.required, Validators.minLength(5),
          Validators.maxLength(50)]),
        password: new FormControl('', [
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()])[A-Za-z\\d!@#$%^&*()]{8,50}$')]),
        birthday: new FormControl(next.birthday.substring(0, 10), [Validators.required,
          Validators.pattern('(19|[2-9][0-9])\\d{2}-([0|1])\\d-([0-3])\\d')]),
        gender: new FormControl(next.gender, Validators.required),
        email: new FormControl(next.email, [Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
          Validators.required]),
        cardId: new FormControl(next.cardId),
        phoneNumber: new FormControl(next.phoneNumber, [Validators.required,
          Validators.pattern('^(0|\\+84)[0-9]{9}$')]),
        address: new FormControl(next.address, [Validators.maxLength(50), Validators.minLength(3)])
      }, [this.checkBirthdayBteToday, this.checkFullName])
    });
  };

  submit() {
    if (!this.formGroup.valid) {
      this.toastr.error('Các trường chưa hợp lệ. Vui lòng nhập lại!', 'LỖI');
      return;
    }
    if (this.formGroup.valid) {
      this.customer.id = this.id;
      this.customer.isDelete = this.isDelete;
      this.customer.fullName = this.formGroup.controls.fullName.value;
      this.customer.gender = this.formGroup.controls.gender.value;
      this.customer.birthday = this.formGroup.controls.birthday.value;
      this.customer.email = this.formGroup.controls.email.value;
      this.customer.phoneNumber = this.formGroup.controls.phoneNumber.value;
      this.customer.address = this.formGroup.controls.address.value;
      this.customer.cardId = this.formGroup.controls.cardId.value;
      this.customer.account.username = this.formGroup.controls.username.value;
      this.customer.account.password = this.formGroup.controls.password.value;

      console.log(this.customer);
      this.customerService.updateCustomer(this.customer).subscribe(() => {
      }, error => {
        this.errorMessage = error.error;
        this.toastr.error(this.errorMessage, 'LỖI!');
      }, () => {
        this.toastr.success('Cập nhật thành công!', 'THÔNG BÁO');
        this.router.navigateByUrl("/customer-management")
      });
    }
  }

  checkBirthdayBteToday(form: any) {
    if (new Date(form.controls.birthday.value).getTime() > new Date().getTime()) {
      return {birthdayBteToday: true};
    }
  }

  checkFullName(form: any) {
    let regex: string = "^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,}$";
    let str: string = form.controls.fullName.value;

    str = str.toLowerCase();
    str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a");
    str = str.replace(/[èéẹẻẽêềếệểễ]/g, "e");
    str = str.replace(/[ìíịỉĩ]/g, "i");
    str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o");
    str = str.replace(/[ùúụủũưừứựửữ]/g, "u");
    str = str.replace(/[ỳýỵỷỹ]/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.trim();

    console.log(str);
    if (!str.match(regex)) {
      return {fullNamePattern: true};
    }
  }


}
