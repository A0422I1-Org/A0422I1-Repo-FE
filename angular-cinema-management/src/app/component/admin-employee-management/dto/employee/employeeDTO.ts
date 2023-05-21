import {Account} from "../../../../model/account";

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
