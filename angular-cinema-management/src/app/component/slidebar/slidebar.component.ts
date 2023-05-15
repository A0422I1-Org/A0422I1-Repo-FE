import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  changeColor(x:number)
  {
    document.getElementById("id-"+x).style.background = '#F26B38';
  }
}
