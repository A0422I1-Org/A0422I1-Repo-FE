import {Position} from "./position";

export interface Employee {
  id: number;
  fullName: string;
  image: string;
  gender: boolean;
  birthday: string;
  email: string;
  phoneNumber: string;
  address: string;
  cardId: string;
  position: Position;
  account: Account;
  isActivated: boolean;
  isDelete: boolean;
}
