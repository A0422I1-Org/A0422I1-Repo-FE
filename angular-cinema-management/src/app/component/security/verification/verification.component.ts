import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SecurityService} from "../../../service/security/security.service";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  isSuccessful = false;
  isSendMail =false;

  constructor(private route:ActivatedRoute,
              private securityService:SecurityService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let code = params['code'];
      if (code == null) {
        this.isSendMail = false;
      } else {
        this.isSendMail = true;
        this.securityService.verify(code).subscribe(
          data => {
            console.log(data.message);
            this.isSuccessful = (data.message === 'activated');
          },
          error => {
            this.isSuccessful = false;
          }
        );
      }
      console.log(code)
    });
  }

}
