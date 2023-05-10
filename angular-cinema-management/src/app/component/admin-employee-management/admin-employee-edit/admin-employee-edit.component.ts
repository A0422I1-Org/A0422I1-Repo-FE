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
import {HttpErrorResponse} from "@angular/common/http";

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
  oldAvatarLink = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';

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
        console.log("a"+this.position)
      },error => {
        alert("lỗi");
      }
    )
  }

  ngOnInit(): void {
    this.employeeService.getEmployeeById(this.id).subscribe(next => {
      this.employee = next;
      console.log("truoc sua",next);
      this.oldAvatarLink=next.image;
      console.log("image",this.oldAvatarLink)
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

  resetFormEmployee() {
    this.formGroup.reset();
    this.oldAvatarLink;
  }

  submit() {
    console.log("bắt đầu")
    if (this.uploadedAvatar !== null) {
      const avatarName = this.getCurrentDateTime() + this.uploadedAvatar.name;
      const fileRef = this.firebase.ref(avatarName);
      this.firebase.upload(avatarName, this.uploadedAvatar).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.formGroup.controls.image.setValue(url);
            console.log("url", url)
            this.employeeService.updateEmployee(this.formGroup.value).subscribe(
              (data: EmployeeDTO) => {
                this.resetFormEmployee();
                this.toastr.success('Update employee successfully!', 'Success: ');
              },
              (error: HttpErrorResponse) => {
                this.toastr.error('Update employee unsuccessfully!', 'Error: ');
              }
            );
          });
        })
      ).subscribe();
    } else {
      console.log('OK');
      // tslint:disable-next-line:max-line-length
      this.formGroup.controls.image.setValue('https://firebasestorage.googleapis.com/v0/b/employee-a44f2.appspot.com/o/User_icon_2.svg.webp?alt=media&token=abf6785f-7548-4697-8775-a949a3081158');
      this.employeeService.updateEmployee(this.formGroup.value).subscribe(
        (data: EmployeeDTO) => {
          this.resetFormEmployee();
          this.toastr.success('Add employee successfully!', 'Success: ');
        },
        (error: HttpErrorResponse) => {
          this.toastr.error('Add employee unsuccessfully!', 'Error: ');
        }
      );
    }


    if (this.formGroup.valid) {
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
      console.log("pass",this.employee.password)

    }
  }

  private getCurrentDateTime() {
    return new Date().getTime();
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
}
