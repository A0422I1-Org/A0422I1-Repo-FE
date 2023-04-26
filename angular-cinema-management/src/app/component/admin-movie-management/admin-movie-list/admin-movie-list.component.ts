import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MovieDTOView} from "../dto/movieDTOView";
import {MovieServiceService} from "../service/movie-service.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-admin-movie-list',
  templateUrl: './admin-movie-list.component.html',
  styleUrls: ['./admin-movie-list.component.css']
})
export class AdminMovieListComponent implements OnInit {
  list: MovieDTOView[] = [];
  movieDetail : MovieDTOView = {};
  totalPages: number = 0;
  pageNumber: number = 0;
  name_search: string = '';
  startDay_search: string = '';
  timeAmount_search: string = '';
  studios_search: string = '';
  @ViewChild('deleteClose') deleteClose: ElementRef;

  constructor(private movieService: MovieServiceService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {
    this.findAllWithCondition(this.name_search, this.startDay_search, this.timeAmount_search, this.studios_search, this.pageNumber);
  }

  findAllWithCondition(name: string, startDay: string, timeAmount: string, studios: string, page: number) {
    this.movieService.getAllList(name, startDay, timeAmount,studios, page).subscribe(value => {

      if (value.content.length === 0) {
        this.toastr.error("Không tìm thấy phim nào theo kết quả tìm kiếm.");
        this.deleteClose.nativeElement.click();
        this.refreshPage();
        return;
      }
      this.deleteClose.nativeElement.click();
      this.list = value.content;
      this.pageNumber = value.number;
      this.totalPages = value.totalPages;
    });
  }

  refreshPage() {
    (<HTMLInputElement>document.getElementById("nameSearch")).value = '';
    (<HTMLInputElement>document.getElementById("dateSearch")).value = '';
    (<HTMLInputElement>document.getElementById("timeSearch")).value = '';
    (<HTMLInputElement>document.getElementById("studioSearch")).value = '';
    this.name_search = '';
    this.startDay_search = '';
    this.timeAmount_search = '';
    this.studios_search = '';
    this.ngOnInit();
  }

  getPageInChoice(page: number) {
    if (this.validPage(page)) {
      this.findAllWithCondition(this.name_search, this.startDay_search, this.timeAmount_search, this.studios_search, page);
    }
  }

  validPage(page): boolean {
    if (page >= this.totalPages || page < 0) {
      (document.getElementById("pageChoice") as HTMLInputElement).value = "";
      this.toastr.error(`Trang chỉ nên trong khoảng 1 đến ${this.totalPages}.`);
      return false;
    }
    if (isNaN(Number(page))) {
      (document.getElementById("pageChoice") as HTMLInputElement).value = "";
      this.toastr.error(`Trang phải là số.`);
      return false;
    }
    return true;
  }

  deleteThis(id: string) {
    this.movieService.deleteById(id).subscribe(value => {
      this.movieDetail = {};
      this.toastr.warning('Đã xóa thành công!!!', 'Thông báo');
      document.getElementById("deleteModal").click();
      if (this.list.length == 1) {
        this.pageNumber = this.pageNumber - 1;
      }
      this.ngOnInit();
    })
  }


  searchWithCondition() {
    this.findAllWithCondition(this.name_search, this.startDay_search, this.timeAmount_search, this.studios_search, 0);
  }

  findById(id: string) {
    this.movieService.findById(id).subscribe(x =>{
        document.getElementById('name_delete').innerText = x.name;
        (document.getElementById('id_delete') as HTMLInputElement).value = x.id;
        this.movieDetail = x;
        console.table(x)
      },
      error => {
        this.ngOnInit();
    })

  }
}

