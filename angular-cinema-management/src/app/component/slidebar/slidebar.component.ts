import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent implements OnInit {

  idBackground: number;

  constructor() {
  }

  ngOnInit(): void {
    const savedBackground = localStorage.getItem('sidebarBackground');
    if (savedBackground) {
      this.idBackground = parseInt(savedBackground);
      document.getElementById("id-" + this.idBackground).style.background = '#F26B38';
    }
  }

  changeColor(x: number) {
    this.idBackground = x;
    localStorage.setItem('sidebarBackground', this.idBackground.toString());
  }
}
