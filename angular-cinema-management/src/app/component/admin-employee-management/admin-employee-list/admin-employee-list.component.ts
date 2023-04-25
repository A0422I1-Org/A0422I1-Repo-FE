import { Component, OnInit } from '@angular/core';
import {EmployeeViewDTO} from "../../../dto/employee/employee-view-dto";
import {FormControl, FormGroup} from "@angular/forms";
import {EmployeeService} from "../../../service/employee/employee.service";
import {ToastrService} from "ngx-toastr";
import {EmployeeDeleteDTO} from "../../../dto/employee/employee-delete-dto";
import {PositionViewDTO} from "../../../dto/employee/position-view-dto";
import {PositionService} from "../../../service/position/position.service";

@Component({
  selector: 'app-admin-employee-list',
  templateUrl: './admin-employee-list.component.html',
  styleUrls: ['./admin-employee-list.component.css']
})
export class AdminEmployeeListComponent implements OnInit {
  employees: EmployeeViewDTO[] = [];
  positions: PositionViewDTO[] = [];
  employeeDeleteDTO: EmployeeDeleteDTO = {};
  totalPages = 1;
  pageNumber = 0;
  totalElements = 0;
  formSearch: FormGroup;

  constructor(private employeeService: EmployeeService,private positionService: PositionService,private statusService: ToastrService) { }

  ngOnInit(): void {
    this.createFormSearch();
    this.findAllPosition();
    this.findAllWithCondition('',-1,0);
  }

  createFormSearch() {
    this.formSearch = new FormGroup({
      name: new FormControl(''),
      positionId: new FormControl(-1)
    });
  }

  findAllPosition()
  {
    this.positionService.findAll().subscribe(value => {
      this.positions=value;
      })
  }

  findAllWithCondition(name: string, positionId: number, page: number) {
    this.employeeService.findAllByNameAndPositionId(name, positionId, page).subscribe(value => {
      this.employees = value.content;
      this.pageNumber = value.number;
      this.totalPages = value.totalPages;
      this.totalElements = value.totalElements;
    });
  }

  findById(id: string) {
    this.employeeService.findById(id).subscribe(value => {
        this.employeeDeleteDTO = value;
        console.log(this.employeeDeleteDTO);
      },
      error => {
        this.ngOnInit();
      });
  }

  deleteById(id: string)
  {
    this.employeeService.deleteById(id).subscribe(value => {
      document.getElementById('deleteModal').click();
      this.statusService.success('Đã xóa thành công!!!', 'Thông báo');
      this.employeeDeleteDTO={};
      if(this.employees.length===1)
        this.findAllWithCondition(this.formSearch.value.name,this.formSearch.value.positionId,this.pageNumber-1);
      else
        this.findAllWithCondition(this.formSearch.value.name,this.formSearch.value.positionId,this.pageNumber);
    });


  }


  getPageChoice(page) {
    if (this.validPage(page)) {
      this.findAllWithCondition(this.formSearch.value.name, this.formSearch.value.positionId, page);
    }
  }

  validPage(page: number) {
    if (page >= this.totalPages || page < 0) {
      this.statusService.error(`Trang chỉ nên trong khoảng từ 1 đến ${this.totalPages}.`);
      (document.getElementById("input-page-choice") as HTMLInputElement).value = "";
      return false;
    }
    if (isNaN(Number(page))) {
      (document.getElementById("input-page-choice") as HTMLInputElement).value = "";
    }
    return true;
  }

  refreshPage() {
    this.ngOnInit();
    this.formSearch.value.name='';
    this.formSearch.value.positionId=-1;
  }
}
