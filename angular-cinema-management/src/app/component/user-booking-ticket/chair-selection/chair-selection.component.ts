import {Component, OnInit} from '@angular/core';
import {ShowtimeService} from "../../../service/showtime/showtime.service";
import {ActivatedRoute} from "@angular/router";
import {Showtime} from "../../../model/showtime";

@Component({
  selector: 'app-chair-selection',
  templateUrl: './chair-selection.component.html',
  styleUrls: ['./chair-selection.component.css']
})
export class ChairSelectionComponent implements OnInit {

  showTime:Showtime;

  constructor(private showtimeService: ShowtimeService, private activatedRoute: ActivatedRoute,) {
    this.getShowTimeById();
  }

  ngOnInit(): void {
  }

  getShowTimeById() {
    this.activatedRoute.paramMap.subscribe(next => {
      const id = next.get('id');
      if (id != null) {
        this.showtimeService.getShowtimeById(parseInt(id)).subscribe(next => {
          console.log(next);
          this.showTime = next;
        })
      }
    })
  }
}
