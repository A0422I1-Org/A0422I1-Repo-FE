import {Position} from "./position";
import {Account} from "./account";

export interface EmployeeEditDTO {
  id?:string;
  image?: string;
  fullName?: string;
  position?: Position;
  birthday?: string;
  gender?: boolean;
  email?: string;
  cardId?: string;
  phoneNumber?: string;
  address?: string;
  account?: Account;
  isDelete?: boolean;

}
