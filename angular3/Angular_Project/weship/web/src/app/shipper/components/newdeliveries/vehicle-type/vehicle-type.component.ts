import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.css']
})
export class VehicleTypeComponent implements OnInit {

  loggedInUser;

  constructor(private _cookieService: CookieService) { }

  ngOnInit() {
    this.loggedInUser = this._cookieService.get('ut');
  }

}
