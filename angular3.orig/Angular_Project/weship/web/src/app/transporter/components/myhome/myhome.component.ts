import { Component, OnInit } from '@angular/core';
import { RestService } from './../../../services/rest.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { HostConfig } from '../../../services/host-config';


@Component({
  selector: 'app-myhome',
  templateUrl: './myhome.component.html',
  styleUrls: ['./myhome.component.css']
})
export class MyhomeComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private _restService: RestService, private _cookieService: CookieService) { }
  loggedInUser;

  ngOnInit() {
    this.loggedInUser = this._cookieService.get("ut");
    console.log(this.loggedInUser);
    if (this.loggedInUser) {

      // this._restService.getRequest(`${HostConfig.hostUrl}/transporter/user/${this.loggedInUser}`).subscribe(data => {
        this._restService.getRequest(`${HostConfig.hostUrl}/transporter/user/19`).subscribe(data => {
        if (data) {
          // this.router.navigate(["profile", (<{ id: number }>data).id], { relativeTo: this.route });
          // this.router.navigate([''], { relativeTo: this.route });
        } else {
          this.router.navigate(["data"], { relativeTo: this.route });
        }
      });
    }
  }


}
