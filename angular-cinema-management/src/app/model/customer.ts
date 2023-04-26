import {Account} from "./account";

export interface Customer {
  id: number;
  fullName: string;
  gender: boolean;
  birthday: string;
  email: string;
  phoneNumber: string;
  address: string;
  cardId: string;
  account: Account;
  isDelete: boolean;
}
