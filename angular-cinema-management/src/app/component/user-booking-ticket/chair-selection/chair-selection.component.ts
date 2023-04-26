import { Component, OnInit } from '@angular/core';
import { ShowtimeService } from "../../../service/showtime/showtime.service";
import { ActivatedRoute } from "@angular/router";
import { Showtime } from "../../../model/showtime";
import { RoomService } from 'src/app/service/room/room.service';
import { Room } from 'src/app/model/room';
@Component({
  selector: 'app-chair-selection',
  templateUrl: './chair-selection.component.html',
  styleUrls: ['./chair-selection.component.css']
})
export class ChairSelectionComponent implements OnInit {

  showTime: Showtime;
  room: Room;
  id: any;

  constructor(private showtimeService: ShowtimeService, private activatedRoute: ActivatedRoute,
    private roomService: RoomService) {
    // this.activatedRoute.paramMap.subscribe(next => {
    //   const id = next.get('idShowTime');
    //   if (id != null) {
    //     this.getRoom(parseInt(id));
    //     this.getShowTimeById(parseInt(id));
    //   }
    // })
    this.id = this.activatedRoute.snapshot.queryParamMap.get('idShowTime');
    this.getRoom(parseInt(this.id));
    this.getShowTimeById(parseInt(this.id));

  }

  ngOnInit(): void {
  }

  getRoom(idShowTime: number) {
    this.roomService.getRoomByShowTime(idShowTime).subscribe(next => {
      console.log(next);
      this.room = next
    },
      error => {
      },
      () => {
      })
  }

  getShowTimeById(idShowTime: number) {
    this.showtimeService.getShowtimeById(idShowTime).subscribe(next => {
      this.showTime = next;
    },
      error => {
      },
      () => {
      })
  }
}
