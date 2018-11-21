import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../../services/rest.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { log } from   'util';
import { Logs } from 'selenium-webdriver';
import { VehicleMaster } from '../../../../shared/modal/vehicleModal';
import { CookieService } from 'ngx-cookie';
import { LoginEvent } from '../../../../services/login-event';
import { } from '@types/googlemaps';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { HostConfig } from '../../../../services/host-config';
@Component({
  selector: 'app-component-hirevehicle',
  templateUrl: './hirevehicle.component.html',
  styleUrls: ['./hirevehicle.component.css']
})
export class HireVehicleComponent implements OnInit {

  brands;
  vehicles;
  vehicleObj: VehicleMaster = new VehicleMaster();
  parentId = 0;
  isSVDFlag: boolean;
  progressSpinner = false;
  minDate = new Date();

  submitForm: FormGroup;


  // clicked: [{ id: number, vehicleName: String }] = [{ id: 0, vehicleName: 'Hire Vehicle' }
  //   // , {id:1, name :'vehicle'}
  //   // , {id:2, name :'car'}
  // ];
  constructor(private router: Router, private _restService: RestService
    , private _cookieService: CookieService
    , private loginEvent: LoginEvent
  ) { }

  loggedInUserId;
  loggedInUser;

  ngOnInit() {

    this.loggedInUserId = this._cookieService.get('ut');
    if (this.loggedInUserId) {
      this.loggedInUser = this._cookieService.getObject('user');
    }

    this.submitForm = new FormGroup({
      'brandId': new FormControl(null, Validators.required),
      'vehicleId': new FormControl(null, Validators.required),
      'fromLoc': new FormControl(null, Validators.required),
      'toLoc': new FormControl(null, Validators.required),
      'fromDate': new FormControl(null, Validators.required),
      'toDate': new FormControl(null, Validators.required),
      'covered': new FormControl(true),
      'summary': new FormControl()
    });

    this._restService.getRequest(`${HostConfig.hostUrl}/vehicleMaster/parent/`).subscribe(res => {
      this.brands = res;
    });

  }

  getVehicle(brandId) {
    this.isSVDFlag = false;
    console.log('Target : ' + brandId);
    this._restService.getRequest(`${HostConfig.hostUrl}/vehicleMaster/parent/` + brandId).subscribe(res => {
      this.vehicles = res;
    });
  }

  getVehicleDetails(vId) {

    this.vehicles.forEach((vehicle) => {

      if (vId === vehicle.id) {

        this.vehicleObj = vehicle;
        if (this.vehicleObj != null) {
          this.isSVDFlag = true;
        }
      }
    });
  }

  vehicleImgaeUrl(imageUrl) {
    return imageUrl ? imageUrl : 'assets/images/no-image.png';
  }

  requestSubmit(status: string) {
    if (!this.loggedInUserId) {
      this.loggedInUserId = this._cookieService.get('ut');
      this.loggedInUser = this._cookieService.get('user');
    }

    if (this.loggedInUserId) {
      this.progressSpinner = true;
      this.convertData(status);
      this._restService.postRequest(`${HostConfig.hostUrl}/listing`, this.convertData(status)).subscribe(res => {
        this.router.navigate(['shipper'], { queryParams: { page: status } });
      });
      setTimeout(() => {
        this.progressSpinner = false;
      }, 3000);
    } else {
      this.loginEvent.canActivateEvent.emit();
    }


  }
  convertData(inputstatus: string) {

    return JSON.stringify({

      userId: this.loggedInUserId,
      name: `${this.loggedInUser.fName} ${this.loggedInUser.lName}`,
      status: inputstatus,
      summary: this.submitForm.get('summary').value,
      fromLatLng: `${this.submitForm.get('fromLoc').value.latlng.lat},${this.submitForm.get('fromLoc').value.latlng.lng}`,
      toLatLng: `${this.submitForm.get('toLoc').value.latlng.lat},${this.submitForm.get('toLoc').value.latlng.lng}`,
      fromLocGoogle: JSON.stringify(this.submitForm.get('fromLoc').value),
      toLocGoogle: JSON.stringify(this.submitForm.get('toLoc').value),
      fromDate: this.submitForm.get('fromDate').value,
      toDate: this.submitForm.get('toDate').value,
      brandId: this.submitForm.get('brandId').value,
      vehicleId: this.submitForm.get('vehicleId').value,
      covered: this.submitForm.get('covered').value,
      shared: false,

      userAmount: 0
    });
  }
  FromLocChange(event) {
    this.submitForm.get('fromLoc').setValue(event);

  }
  ToLocChange(event) {
    this.submitForm.get('toLoc').setValue(event);

  }

  calculateDistance() {
    const origin1 = new google.maps.LatLng(55.930385, -3.118425);
    const origin2 = 'Greenwich, England';
    const destinationA = 'Stockholm, Sweden';
    const destinationB = new google.maps.LatLng(50.087692, 14.421150);

    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({

      origins: [origin1],
      destinations: [destinationB],
      travelMode: google.maps.TravelMode.DRIVING,
      //   transitOptions: TransitOptions,
      //   drivingOptions: DrivingOptions,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, (response, status) => {
      console.log(response);
      console.log(status);
    });
  }
  // src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC1eWk-2vuh_ueY4A0h0Vm6JEv1qg0VF_s&callback=initMap";


  // showcategory(categoryclicked) {
  //   this.parentId = categoryclicked.id;

  //   if (this.parentId == 0) {
  //     this._restService.getRequest(`${HostConfig.hostUrl}/vehicleMaster/parent/`).subscribe(res => {
  //       this.categories = res;

  //     })
  //   } else {
  //     this.loadChilds();


  //   }
  //   this.showForm=true;
  // }
  // loadChilds() {
  //   this._restService.getRequest(`${HostConfig.hostUrl}/vehicleMaster/parent/${this.parentId}`).subscribe(res => {
  //     this.categories = res;

  //   })
  // }
}

// class UserName {
//   fName: string;
//   lName: string
// }
