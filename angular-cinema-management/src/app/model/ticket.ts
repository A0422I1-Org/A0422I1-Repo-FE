import {Customer} from "./customer";
import {Showtime} from "./showtime";
import {ChairRoom} from "./chair-room";

export interface Ticket {
  id: string;
  customer: Customer;
  showTime: Showtime;
  chairRoom: ChairRoom;
  price: number;
  status: number;
  book_datetime: string;
  isDelete: boolean;
}
