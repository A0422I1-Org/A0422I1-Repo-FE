import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {element} from "protractor";

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent implements OnInit {
  activePage: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.activePage = "http://localhost:4200" + this.router.url;
  }

  changeColor(href: string) {
    this.activePage = href;
  }
}
