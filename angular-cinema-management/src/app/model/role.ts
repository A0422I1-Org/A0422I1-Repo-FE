import {AccountRole} from "./account-role";

export interface Role {
  id: number;
  name: string;
  isDelete: boolean;
  accountRole: AccountRole[];
}
