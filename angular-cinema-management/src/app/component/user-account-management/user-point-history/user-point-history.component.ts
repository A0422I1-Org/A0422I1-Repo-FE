import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Point} from "../../../model/point";
import {PointService} from "../../../service/point/point.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-point-history',
  templateUrl: './user-point-history.component.html',
  styleUrls: ['./user-point-history.component.css']
})
export class UserPointHistoryComponent implements OnInit {

  pointList: Point[] = [];
  size = 5;
  indexPagination = 0;
  totalPages = 0;
  totalElements = 0;
  errMessage: string;
  totalPoint: number;
  searchForm: FormGroup;

  getSumTotalPointByCustomer() {
    this.pointService.getSumPointByCustomer().subscribe(value => {
      this.totalPoint = value;
    }, error => {
      this.totalPoint = null;
      this.errMessage = "Không có dữ liệu";
    })
  }


  constructor(private pointService: PointService, private  router: Router, @Inject(LOCALE_ID) private locale: string) {
    this.searchForm = new FormGroup({
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
    }, [this.checkEndDate, this.checkNowDate])
  }

  ngOnInit(): void {
    this.getPointList(this.indexPagination);
    this.getSumTotalPointByCustomer();
    this.getPointList(this.indexPagination)
  }

  getList(page: number) {
    this.pointService.getAllPointByCustomer(page).subscribe(value => {
      this.pointList = value.content;
      this.indexPagination = value.number;
      this.totalPages = value.totalPages;
      this.totalElements = value.totalElements;
    }, error => {
      this.pointList = [];
      this.errMessage = "Không có dữ liệu"
    })
  }

  getPointList(page: number) {
    const startDate = (this.searchForm.controls.startDate.value)
    const endDate = (this.searchForm.controls.endDate.value)
    if (startDate !== '' || endDate !== '') {
      this.pointService.getAllPointByCustomerDateBetween(startDate, endDate, page, this.size).subscribe(value => {
        this.pointList = value.content
        this.indexPagination = value.number;
        this.totalPages = value.totalPages;
        this.totalElements = value.totalElements;
      })
    } else {
      this.pointService.getAllPointByCustomer(page).subscribe(value => {
        this.pointList = value.content;
        this.indexPagination = value.number;
        this.totalPages = value.totalPages;
        this.totalElements = value.totalElements;
      }, error => {
        this.pointList = [];
        this.errMessage = "Không có dữ liệu"
      })
    }
  }

  checkEndDate(form: any) {
    console.log(new Date(form.controls.startDate.value))
    const startDate = new Date(form.controls.startDate.value)
    const endDate = new Date(form.controls.endDate.value)
    if (startDate.getTime() > endDate.getTime()) {
      return {startDateLargerEndDate: true}
    }
  }

  checkNowDate(form: any) {
    const nowDate = new Date().getTime()
    const startDate = new Date(form.controls.startDate.value).getTime()
    const endDate = new Date(form.controls.endDate.value).getTime()
    if ((startDate > nowDate || endDate > nowDate)) {
      return {checkDate: true}
    }
  }

  getPageChoice(page) {
    if (this.validPage(page)) {
      this.getPointList(page);
    }
  }

  validPage(page: number) {
    if (page >= this.totalPages || page < 0) {
      (document.getElementById("input-page-choice") as HTMLInputElement).value = "";
      return false;
    }
    if (isNaN(Number(page))) {
      (document.getElementById("input-page-choice") as HTMLInputElement).value = "";
    }
    return true;
  }

}
