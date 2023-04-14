import {Customer} from "./customer";

export interface Point {
  id: number;
  point: number;
  date: string;
  description: string;
  customer: Customer;
  isDelete: boolean;
}
