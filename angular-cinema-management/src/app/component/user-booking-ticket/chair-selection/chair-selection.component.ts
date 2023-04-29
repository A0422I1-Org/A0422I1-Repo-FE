import { Ticket } from "./../../../model/ticket";
import { TicketService } from "./../../../service/ticket/ticket.service";
import { Component, OnInit } from "@angular/core";
import { ShowtimeService } from "../../../service/showtime/showtime.service";
import { ActivatedRoute } from "@angular/router";
import { Showtime } from "../../../model/showtime";
import { RoomService } from "src/app/service/room/room.service";
import { Room } from "src/app/model/room";
import Swal from "sweetalert2";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-chair-selection",
  templateUrl: "./chair-selection.component.html",
  styleUrls: ["./chair-selection.component.css"],
})
export class ChairSelectionComponent implements OnInit {
  showTime: Showtime;
  room: Room;
  id: any;
  tickets: Ticket[] = [];
  selectedSeats: Ticket[] = [];
  priceTicket: number = 0;
  timeCount = 0;

  constructor(
    private showtimeService: ShowtimeService,
    private activatedRoute: ActivatedRoute,
    private roomService: RoomService,
    private ticketService: TicketService
  ) {
    const interval = setInterval(() => {
      this.timeCount++;
      if (this.timeCount > 300) {
        clearInterval(interval);
        window.location.href = "url-redirect";
      }
    }, 1000);
  }

  ngOnInit(): void {
    this.getId().subscribe((id) => {
      console.log(id);
      this.id = id;
      if (id != null || id != "") {
        this.getShowTimeById(parseInt(id));
        this.getRoom(parseInt(id));
      }
    });
  }

  getId(): Observable<any> {
    return this.activatedRoute.queryParamMap.pipe(
      map((params) => params.get("showTimeId"))
    );
  }

  getTicketByIdRoomAndIdShowTime(idRoom: number, idShowtime: number) {
    this.ticketService.getTicketByShowTimeAndRoom(idRoom, idShowtime).subscribe(
      (next) => {
        this.tickets = next;
      },
      (error) => {
        Swal.fire({
          position: "top",
          icon: "warning",
          title: "Hiện đang lỗi",
          showConfirmButton: true,
          confirmButtonText: "OK",
          showCloseButton: true,
        });
      },
      () => {}
    );
  }

  getRoom(idShowTime: number) {
    this.roomService.getRoomByShowTime(idShowTime).subscribe(
      (next) => {
        this.room = next;
        this.getTicketByIdRoomAndIdShowTime(this.room.id, this.id);
      },
      (error) => {},
      () => {}
    );
  }
  getShowTimeById(idShowTime: number) {
    this.showtimeService.getShowtimeById(idShowTime).subscribe(
      (next) => {
        this.showTime = next;
      },
      (error) => {},
      () => {}
    );
  }
  onSeatClick(event: Event, ticket: Ticket) {
    if (ticket.status) {
      return;
    }
    event.stopPropagation();
    const index = this.selectedSeats.indexOf(ticket);
    if (index > -1) {
      this.selectedSeats.splice(index, 1);
      this.priceTicket -= ticket.price;
    } else {
      this.selectedSeats.push(ticket);
      this.priceTicket += ticket.price;
      this.isSelected(ticket);
      console.log(this.selectedSeats);
    }
  }
  isSelected(ticket: any) {
    return this.selectedSeats.indexOf(ticket) > -1;
  }
  onContinue() {
    if (this.selectedSeats == null || this.selectedSeats.length == 0) {
      Swal.fire({
        position: "top",
        icon: "warning",
        title: "Vui lòng chọn ghế cần đặt",
        showConfirmButton: true,
        confirmButtonText: "OK",
        showCloseButton: true,
      });
    } else {
      this.ticketService.changeList(this.selectedSeats);
    }
  }
}
