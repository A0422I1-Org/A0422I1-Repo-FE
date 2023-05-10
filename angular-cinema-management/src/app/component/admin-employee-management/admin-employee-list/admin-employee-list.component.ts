import { Component, OnInit } from '@angular/core';
import {EmployeeDTO} from "../../../model/employeeDTO";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {EmployeeService} from "../../../service/employee/employee.service";

@Component({
  selector: 'app-admin-employee-list',
  templateUrl: './admin-employee-list.component.html',
  styleUrls: ['./admin-employee-list.component.css']
})
export class AdminEmployeeListComponent implements OnInit {
  employees: EmployeeDTO[];
  private subsctiption: Subscription;
  // id: string;
  // name:string;
  // p=1;
  // date: string
  constructor(private router: Router,
              private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.subsctiption= this.employeeService.getAll().subscribe(
      value => {
        this.employees= value;
      },error => {
        alert("lỗi không hiển thị");
      }
    )
  }

  // showId(id: string, nameCustomer: string,ngay: string) {
  //   this.id=id;
  //   this.name=nameCustomer;
  //   this.date=ngay;
  //   console.log("id"+id)
  // }

}
