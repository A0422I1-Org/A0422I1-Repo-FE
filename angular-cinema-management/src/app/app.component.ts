import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-cinema-management';
  user: firebase.User;

  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        console.log(this.user);
      } else {
        this.user = null;
      }
    });
  }
}
