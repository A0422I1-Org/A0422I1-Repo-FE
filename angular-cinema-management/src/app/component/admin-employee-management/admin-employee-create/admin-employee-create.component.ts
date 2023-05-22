import { Component, OnInit } from '@angular/core';
import {PositionService} from "../../../service/position/position.service";
import {Position} from "../../../model/position";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {EmployeeService} from "../../../service/employee/employee.service";

import {ToastrService} from "ngx-toastr";
import {finalize} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {EmployeeDTO} from "../dto/employee/employeeDTO";
import {AngularFireStorage} from "@angular/fire/storage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-employee-create',
  templateUrl: './admin-employee-create.component.html',
  styleUrls: ['./admin-employee-create.component.css']
})
export class AdminEmployeeCreateComponent implements OnInit {
  position: Position[];
  employeeCreate: EmployeeDTO[] = [];
  employeeFormCreate: FormGroup;
  uploadedAvatar = null;
  loading = false;
  downloadURL: string;
  errorMessage: string;

  oldAvatarLink = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';

  constructor(private positionService: PositionService,
              private employeeService: EmployeeService,
              private fireStorage: AngularFireStorage,
              private toastr: ToastrService,
              private router: Router) {
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
    this.employeeFormCreate = new FormGroup(
      {
        image: new FormControl(''),
        username: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(45),Validators.pattern("^[A-z_](\\w|\\.|_){5,45}$")]),
        password: new FormControl('',[Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]),
        confirmPassword: new FormControl('',[Validators.required]),
        fullName: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(45), Validators.pattern("^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$")]),
        position: new FormControl('',[Validators.required]),
        birthday: new FormControl('',[Validators.pattern("^(19[0-9]{2}|200[0-7])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$")]),
        gender: new FormControl('',[Validators.required]),
        email: new FormControl('',[Validators.required, Validators.email,Validators.maxLength(256)]),
        cardId: new FormControl('', [Validators.required, Validators.pattern("^\\d{9}$")]),
        phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^(0\\d{9,10})$")]),
        address: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(100)])
      },[this.comparePassword]
    )
  }

  comparePassword(form: any) {
    const password = form.controls.password.value;
    const confirmPassword = form.controls.confirmPassword.value;
    if (password === confirmPassword) {
      return null;
    }
    return {'not': true};
  }

  isOver16(birthdate: Date): boolean {
    const currentDate = new Date();
    const diff = currentDate.getFullYear() - birthdate.getFullYear();
    if (diff > 16) {
      return true;
    } else if (diff === 16) {
      const currentMonth = currentDate.getMonth() + 1;
      const birthMonth = birthdate.getMonth() + 1;
      if (currentMonth > birthMonth) {
        return true;
      } else if (currentMonth === birthMonth) {
        const currentDay = currentDate.getDate();
        const birthDay = birthdate.getDate();
        if (currentDay >= birthDay) {
          return true;
        }
      }
    }
    return false;
  }

  resetFormEmployee() {
    this.employeeFormCreate.reset();
    this.oldAvatarLink = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';
  }
  submit() {
    // Upload img & download url
    console.log("bắt đầu")
    if (this.uploadedAvatar !== null) {
      const avatarName = this.getCurrentDateTime() + this.uploadedAvatar.name;
      const fileRef = this.fireStorage.ref(avatarName);
      this.fireStorage.upload(avatarName, this.uploadedAvatar).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.employeeFormCreate.controls.image.setValue(url);
            console.log("url", url)
            this.employeeService.save(this.employeeFormCreate.value).subscribe(() => {
            }, error => {
              this.errorMessage = error.error;
              this.toastr.error(this.errorMessage, 'LỖI!');
            }, () => {
              this.toastr.success('Thêm nhân viên thành công!', 'THÔNG BÁO');
              console.log("bắt")
              this.router.navigateByUrl("/employee_management/employee")
              console.log("hêt")
            });
          });
        })
      ).subscribe();
    } else {
      console.log('OK');
      // tslint:disable-next-line:max-line-length
      this.employeeFormCreate.controls.image.setValue('https://firebasestorage.googleapis.com/v0/b/employee-a44f2.appspot.com/o/User_icon_2.svg.webp?alt=media&token=abf6785f-7548-4697-8775-a949a3081158');
      this.employeeService.save(this.employeeFormCreate.value).subscribe(
        () => {
          this.toastr.success('Thêm mới nhân viên thành công!', 'Success: ');
          this.router.navigateByUrl("/employee_management/employee")
          console.log("đây là trước")

          console.log("đây là sau")
        },error => {
          this.errorMessage = error.error;
          this.toastr.error(this.errorMessage, 'LỖI!');
        }
      );
    }
  }
  getAvatar(event: any) {
    this.uploadedAvatar = event.target.files[0];
    if (this.uploadedAvatar) {
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedAvatar);
      reader.onload = (e: any) => {
        this.oldAvatarLink = e.target.result;
      };
    }
    console.log("file0",this.uploadedAvatar)
  }

  private getCurrentDateTime() {
    return new Date().getTime();
  }
}
