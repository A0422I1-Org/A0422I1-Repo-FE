import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../service/token/token-storage.service";

@Component({
  selector: 'app-user-moive-list',
  templateUrl: './user-moive-list.component.html',
  styleUrls: ['./user-moive-list.component.css']
})
export class UserMoiveListComponent implements OnInit {

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    console.log("Username: "+this.token.getUser().username)
    console.log("Token: "+this.token.getUser().token)
    console.log("Token: "+this.token.getUser().roles[0])
    // this.token.signOut()
  }

}
