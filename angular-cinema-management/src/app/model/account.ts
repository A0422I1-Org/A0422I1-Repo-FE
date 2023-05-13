import {AccountRole} from "./account-role";

export interface Account {
  username: string;
  password: string;
  isEnable: boolean;
  verificationCode: string;
  isDelete: boolean;
  accountRole: AccountRole[];
}
