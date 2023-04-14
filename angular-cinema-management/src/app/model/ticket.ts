import {Customer} from "./customer";
import {Showtime} from "./showtime";
import {ChairRoom} from "./chair-room";

export interface Ticket {
  id: number;
  customer: Customer;
  showtime: Showtime;
  chairRoom: ChairRoom;
  price: number;
  status: boolean;
  bookDateTime: string;
  isDelete: boolean;
}
