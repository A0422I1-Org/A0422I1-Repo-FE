import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Promotion} from "src/app/model/promotion";
import {PromotionService} from "src/app/service/promotion/promotion.service";

@Component({
  selector: 'app-user-promotion-detail',
  templateUrl: './user-promotion-detail.component.html',
  styleUrls: ['./user-promotion-detail.component.css']
})
export class UserPromotionDetailComponent implements OnInit {
  promotion: Promotion;

  constructor(private activatedRoute: ActivatedRoute,
              private promotionService: PromotionService) {

    this.activatedRoute.paramMap.subscribe(next => {
      const id = next.get('id');
      if (id != null) {
        this.promotionService.findById(parseInt(id)).subscribe(next => {
          this.promotion = next;
        });
      }
    }, error => {

    }, () => {
    });
  }

  ngOnInit(): void {
  }

}
