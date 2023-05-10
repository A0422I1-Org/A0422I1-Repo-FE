import { Component, OnInit } from '@angular/core';
import {EmployeeDTO} from "../../../model/employeeDTO";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../../service/employee/employee.service";
import {ActivatedRoute, Router} from "@angular/router"
import {Account} from "../../../model/account";
import {Position} from "../../../model/position";
import {PositionService} from "../../../service/position/position.service";
import {EmployeeEditDTO} from "../../../model/employeeEditDTO";
import {ToastrService} from "ngx-toastr";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-admin-employee-edit',
  templateUrl: './admin-employee-edit.component.html',
  styleUrls: ['./admin-employee-edit.component.css']
})
export class AdminEmployeeEditComponent implements OnInit {
  employee: EmployeeDTO;
  position: Position[]=[];
  id: string;
  isDelete: boolean;
  uploadedAvatar = null;
  code: number;

  formGroup: FormGroup = new FormGroup({
    image: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
    fullName: new FormControl(),
    position: new FormControl(),
    birthday: new FormControl(),
    gender: new FormControl(),
    email: new FormControl(),
    cardId: new FormControl(),
    phoneNumber: new FormControl(),
    address: new FormControl()
  },[this.comparePassword]);
  comparePassword(form: any) {
    const password = form.controls.password.value;
    const confirmPassword = form.controls.confirmPassword.value;
    if (password === confirmPassword) {
      return null;
    }
    return {'not': true};
  }

  constructor(private positionService: PositionService,
              private employeeService: EmployeeService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private firebase: AngularFireStorage) {
    this.activatedRoute.paramMap.subscribe(next => {
      this.id = next.get('id');
    });
    this.positionService.getAllPosition().subscribe(
      value => {
        this.position = value;
        // alert(value)
        console.log("a"+this.position)
      },error => {
        alert("lỗi");
      }
    )
  }

  ngOnInit(): void {
    this.employeeService.getEmployeeById(this.id).subscribe(next => {
      this.employee = next;
      console.log("truoc sua"+next);
      // this.isDelete = next.isDelete;
      // this.today = new Date();
      // console.log(this.today)
      this.formGroup = new FormGroup({
        id: new FormControl(next.id),
        image: new FormControl(next.image,[Validators.required]),
        username: new FormControl(next.account.username),
        password: new FormControl(next.account.password,[Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]),
        confirmPassword: new FormControl(),
        fullName: new FormControl(next.fullName, [Validators.required, Validators.minLength(7), Validators.maxLength(45), Validators.pattern("^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$")]),
        position: new FormControl(next.position,[Validators.required]),
        birthday: new FormControl(next.birthday,[Validators.pattern("^(19[0-9]{2}|200[0-7])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$")]),
        gender: new FormControl(next.gender,[Validators.required]),
        email: new FormControl(next.email,[Validators.required, Validators.email]),
        cardId: new FormControl(next.cardId, [Validators.required, Validators.pattern("^\\d{12}$")]),
        phoneNumber: new FormControl(next.phoneNumber, [Validators.required, Validators.pattern("^(0\\d{9,10})$")]),
        address: new FormControl(next.address,[Validators.required, Validators.minLength(3), Validators.maxLength(100)])
      },[this.comparePassword])
    })
  };



  submit() {
    this.employee = this.formGroup.value;
    console.log("11111",this.employee);
    console.log("1111id",this.employee.id);
    console.log("aaaaaaaa");
    // if (this.employeeFormCreate.valid){
    this.employeeService.updateEmployee(this.employee).subscribe(
      value => {
        console.log(value);
        console.log("update thành công")
        // this.toastr.success("Đăng ký tài khoản thành công!", "Thông báo");
      },
      error => {
        console.log("lỗi")
      }
    )
    if (this.formGroup.valid) {

      // this.employee.isDelete = this.isDelete;
      this.employee.image = this.formGroup.controls.image.value;
      this.employee.fullName = this.formGroup.controls.fullName.value;
      this.employee.position = this.formGroup.controls.position.value;
      this.employee.birthday = this.formGroup.controls.birthday.value;
      this.employee.gender = this.formGroup.controls.gender.value;
      this.employee.email = this.formGroup.controls.email.value;
      this.employee.cardId = this.formGroup.controls.cardId.value;
      this.employee.phoneNumber = this.formGroup.controls.phoneNumber.value;
      this.employee.address = this.formGroup.controls.address.value;
      this.employee.id = this.id;
      this.employee.username = this.formGroup.controls.userName.value;
      this.employee.password = this.formGroup.controls.password.value;

      console.log("sau sua",this.employee.position);
      // this.notValid = false;
      this.employee = this.formGroup.value;
      console.log("sua", this.employee)
      this.employeeService.updateEmployee(this.employee).subscribe(
        value => {
          console.log(value);
          console.log("thêm thành công")
          // this.toastr.success("Đăng ký tài khoản thành công!", "Thông báo");
        },
        error => {
          console.log("lỗi")
        }
      )
    }
  }


  // checkBirthdayBteToday(form: any) {
  //   if (new Date(form.controls.birthday.value).getTime() > new Date().getTime()) {
  //     return {birthdayBteToday: true};
  //   }
  // }
  //
  // checkFullName(form: any) {
  //   let regex: string = "^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,}$";
  //   let str: string = form.controls.fullName.value;
  //
  //   str = str.toLowerCase();
  //   str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a");
  //   str = str.replace(/[èéẹẻẽêềếệểễ]/g, "e");
  //   str = str.replace(/[ìíịỉĩ]/g, "i");
  //   str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o");
  //   str = str.replace(/[ùúụủũưừứựửữ]/g, "u");
  //   str = str.replace(/[ỳýỵỷỹ]/g, "y");
  //   str = str.replace(/đ/g, "d");
  //   str = str.trim();
  //
  //   console.log(str);
  //   if (!str.match(regex)) {
  //     return {fullNamePattern: true};
  //   }
  // }
  oldAvatarLink = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';
  type: string;
  getAvatar(event: any) {
    this.uploadedAvatar = event.target.files[0];
    this.type = event.target.files[0].type;
    if (this.type !== 'image/jpeg' && this.type !== 'image/png') {
      this.toastr.error('The requested file format is incorrect!', 'Error: ');
    } else {
      if (this.uploadedAvatar) {
        const reader = new FileReader();
        reader.readAsDataURL(this.uploadedAvatar);
        reader.onload = (e: any) => {
          this.oldAvatarLink = e.target.result;
        };
      }
      if (this.uploadedAvatar !== null) {
        // Upload img & download url
        const avatarName = this.getCurrentDateTime() + this.uploadedAvatar.name;
        const fileRef = this.firebase.ref(avatarName);
        this.firebase.upload(avatarName, this.uploadedAvatar).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              // delete old img from firebase
              if (this.employee.image !== null) {
                this.firebase.storage.refFromURL(this.employee.image).delete();
              }

              // Update employee
              // this.employeeService.updateEmployee(url, code).subscribe(
              //   () => {
              //     this.toastr.success('Upload avatar successfully!', 'Success: ');
              //   },
              //   (error) => {
              //     this.toastr.error('Upload avatar unsuccessfully!', 'Error: ');
              //     this.uploadedAvatar = null;
              //   },
              // );
            });
          })
        ).subscribe();
      }
    }
  }

  private getCurrentDateTime() {
    return new Date().getTime();
  }
}
