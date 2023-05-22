import {Customer} from "../model/customer";

export class JwtResponse {

  token: string;
  customer: Customer;
  username: string

  constructor(token: string) {
    this.token = token;
  }
}
