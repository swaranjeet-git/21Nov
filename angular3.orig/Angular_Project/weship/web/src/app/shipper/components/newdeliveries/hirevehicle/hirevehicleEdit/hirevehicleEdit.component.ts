import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { VehicleMaster } from '../../../../../shared/modal/vehicleModal';
import { RestService } from '../../../../../services/rest.service';
import { HostConfig } from '../../../../../services/host-config';
@Component({
  selector: 'app--hirevehicle-edit',
  templateUrl: './hirevehicleEdit.component.html',
  styleUrls: ['./hirevehicleEdit.component.css']
})
export class HireVehicleEditComponent implements OnInit {

  brands;
  vehicles;
  id;
  vehicleObj: VehicleMaster = new VehicleMaster();
  editVehicle: Listing = new Listing();
  parentId = 0;
  isSVDFlag: boolean;
  progressSpinner = false;
  minDate = new Date();

  submitForm: FormGroup;


  // clicked: [{ id: number, vehicleName: String }] = [{ id: 0, vehicleName: 'Hire Vehicle' }
  //   // , {id:1, name :'vehicle'}
  //   // , {id:2, name :'car'}
  // ];
  constructor(private router: Router,
    private route: ActivatedRoute,
    private _restService: RestService) { }

  ngOnInit() {

    this.submitForm = new FormGroup({
      'brandId': new FormControl(),
      'vehicleId': new FormControl(),
      'fromLoc': new FormControl(),
      'toLoc': new FormControl(),
      'fromDate': new FormControl(),
      'toDate': new FormControl(),
      'summary': new FormControl(),
      'covered': new FormControl()
    });

    this._restService.getRequest(`${HostConfig.hostUrl}/vehicleMaster/parent/`).subscribe(res => {
      this.brands = res;
    });

    this.id = this.route.snapshot.params['id'];
    this._restService.getRequest(`${HostConfig.hostUrl}/listing/${this.id}`).subscribe(res => {
      this.editVehicle = <Listing>res;
      // console.log('edit');
      // console.log(this.editVehicle);

      this.getVehicle(this.editVehicle.brandId);


      this.submitForm.patchValue({
        'brandId': this.editVehicle.brandId,
        'vehicleId': this.editVehicle.vehicleId,
        'fromLoc': this.editVehicle.fromLoc,
        'toLoc': this.editVehicle.toLoc,
        'fromDate': new Date(this.editVehicle.fromDate),
        'toDate': new Date(this.editVehicle.toDate),
        'summary': this.editVehicle.summary,
        'covered': this.editVehicle.covered
      });

    });

  }

  getVehicle(brandId) {
    this.isSVDFlag = false;
    // console.log('Target : ' + brandId);
    this._restService.getRequest(`${HostConfig.hostUrl}/vehicleMaster/parent/` + brandId).subscribe(res => {
      this.vehicles = res;
      console.log(this.vehicles);
      console.log(this.editVehicle.vehicleId);

      this.submitForm.patchValue({
        'vehicleId': this.editVehicle.vehicleId,
      });

      this.getVehicleDetails(this.editVehicle.vehicleId);
    });
  }

  getVehicleDetails(vId) {
    // console.log('VID : ' + this.vehicleObj.id);
    this.vehicles.forEach((vehicle) => {

      if (vId === vehicle.id) {
        // console.log('vehicle' + vehicle.imageUrl);
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

  editRequestSubmit() {
    this.progressSpinner = true;
    // console.log('-----> ' + this.convertData());
    this._restService.putRequest(`${HostConfig.hostUrl}/listing/${this.id}`, this.convertData()).subscribe(data => { });
    setTimeout(() => {
      this.progressSpinner = false;
      this.router.navigate(['shipper']);
    }, 2000);
    // .subscribe(res=>{
    //
    // })
  }

  goToDashboard() {
    this.router.navigate(['shipper']);
  }

  convertData() {
    return JSON.stringify({
      //status: 'draft',
      count: '1',
      summary: this.submitForm.get('summary').value,
      fromLocGoogle: JSON.stringify(this.submitForm.get('fromLoc').value),
      toLocGoogle: JSON.stringify(this.submitForm.get('toLoc').value),
      fromDate: this.submitForm.get('fromDate').value,
      toDate: this.submitForm.get('toDate').value,
      brandId: this.submitForm.get('brandId').value,
      vehicleId: this.submitForm.get('vehicleId').value,
      covered: this.submitForm.get('covered').value,
      hired: 'complete'
    });
  }
  FromLocChange(event) {
    this.submitForm.get('fromLoc').setValue(event);

  }
  ToLocChange(event) {
    this.submitForm.get('toLoc').setValue(event);
    // console.log(this.submitForm);
    // console.log(this.submitForm);
  }
}

export class Listing {
  id: number;
  userId: string;
  status: string;
  count: string;
  summary: string;
  fromLoc: string;
  toLoc: string;
  fromDate: string;
  toDate: string;
  brandId: number;
  vehicleId: number;
  hired: string;
  covered: boolean;
  userAmount: number;
}
