import {Position} from "./position";
import {Account} from "./account";

export interface EmployeeDTO {
  id?:string;
  image?: string;
  username?: string;
  password?: string;
  fullName?: string;
  position?: Position;
  birthday?: string;
  gender?: boolean;
  email?: string;
  cardId?: string;
  phoneNumber?: string;
  address?: string;
  account?:Account




}
