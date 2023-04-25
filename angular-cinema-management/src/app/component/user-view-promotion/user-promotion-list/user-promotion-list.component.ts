import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Promotion} from "src/app/model/promotion";
import {PromotionService} from "src/app/service/promotion/promotion.service";

@Component({
  selector: 'app-user-promotion-list',
  templateUrl: './user-promotion-list.component.html',
  styleUrls: ['./user-promotion-list.component.css']
})
export class UserPromotionListComponent implements OnInit {
  promotions: Promotion [] = [];

  constructor(private promotionService: PromotionService) { }

  // getAllPromotion() {
  //   this.promotionService.getAll().subscribe(next => {
  //     console.log(next);
  //     this.promotions = next;
  //   }, error => {
  //
  //   }, () => {
  //
  //   });
  // }
  // ngOnInit(): void {
  //   this.getAllPromotion()
  // }


  // hiển thị xem thêm
  showAll = false;
  isShowMoreVisible = true;
  showNumber = 4;

  getAllPromotion() {
    this.promotionService.getAll().subscribe(next => {
      console.log(next);
      this.promotions = next;
      if (this.promotions.length <= this.showNumber) {
        this.isShowMoreVisible = false;
      }
    }, error => {

    }, () => {

    });
  }

  ngOnInit(): void {
    this.getAllPromotion()
  }

  getVisibleProducts(): Promotion[] {
    return this.showAll ? this.promotions : this.promotions.slice(0, this.showNumber);
  }

  showAllPromotions(): void {
    this.showAll = true;
    this.isShowMoreVisible = false;
  }

}
