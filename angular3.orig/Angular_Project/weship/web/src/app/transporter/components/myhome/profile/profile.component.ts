import { HostConfig } from './../../../../services/host-config';
import { Component, OnInit } from '@angular/core';
import { RestService } from './../../../../services/rest.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Transporter, CompanyDetails, VehicleDetail } from '../../../../shared/modal/transporter';
import { CookieService } from 'ngx-cookie';
import { User } from '../../../../shared/modal/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  personalDetailEdit = false;
  companyDetailEdit = false;
  vehicleDetailEdit = false;
  cancelFlag;

  vehicleNames;
  brands;
  docTypes;
  
  user: User = new User();
 
  company: CompanyDetails = new CompanyDetails();
 
  vehicleDetail: VehicleDetail = new VehicleDetail();

 
  perDetailsForm: FormGroup;
  comDetailsForm: FormGroup;
  vechDetailsForm: FormGroup;

  constructor(private _formBuilder: FormBuilder
    , private restService: RestService
    , private route: ActivatedRoute
    , private _cookieService: CookieService) { }

  ngOnInit() {
    // let id = this.route.snapshot.params['id'];
let id = this._cookieService.get("up");
    console.log(id);
    this.perDetailsForm = this._formBuilder.group({
      fName: [null],
      lName: [null],
      email: [null],
      mobile: [null]

    })
    
    this.comDetailsForm = this._formBuilder.group({
      companyName: [null],
      address: [null],
      city: [null],
      country: [null],
      pincode: [null]
    })

    this.vechDetailsForm = this._formBuilder.group({
      id: [null],
      vehicleRegNo: [null],
      vehicleMaster: this._formBuilder.group({
        parent: this._formBuilder.group({
          id: [null]
        }),
        id: [null],
        vehicleName: [null],
        brandName: [null],
        type: [null],
        size: [null],
        capacity: [null]
      }),
      vehicleDoc: this._formBuilder.group({
        documentType: this._formBuilder.group({
          id: [null],
          docType: [null],
        }),
        id: [null],
        docNo: [null],
        desc: [null],
      }),
    })

    this.restService.getRequest(`${HostConfig.hostUrl}/vehicleMaster/parent`).subscribe(data => {
      this.brands = data;
    });

    this.restService.getRequest(`${HostConfig.hostUrl}/doctype/`).subscribe(data => {
      this.docTypes = data;
    });

    this.restService.getRequest(`${HostConfig.hostUrl}/transporter/user/${id}`).subscribe(data => {

      /*user */
      this.user = (<Transporter>data).user;
      /*companyDetails */
      this.company = (<Transporter>data).companyDetails;

      /*userVehicleDetails */
      //this.vehicleDetail = (<Transporter>data).vehicleDetail;
      console.log(data);
      
      this.selectVehicle(this.vehicleDetail.vehicleMaster.parent.id);

      this.perDetailsForm.patchValue({
        fName: this.user.fName,
        lName: this.user.lName,
        email: this.user.email,
        mobile: this.user.mobile
      });
      this.comDetailsForm.patchValue({
        companyName: this.company.companyName,
        address: this.company.address,
        city: this.company.city,
        country: this.company.country,
        pincode: this.company.pincode
      });


      this.vechDetailsForm.patchValue({
        id: this.vehicleDetail.id,

        vehicleMaster:
          {
            parent: {
              id: this.vehicleDetail.vehicleMaster.parent.id,
            },
            id: this.vehicleDetail.vehicleMaster.id,
            brandName: this.vehicleDetail.vehicleMaster.brandName,
            vehicleName: this.vehicleDetail.vehicleMaster.vehicleName,
            type: this.vehicleDetail.vehicleMaster.type,
            size: this.vehicleDetail.vehicleMaster.size,
            capacity: this.vehicleDetail.vehicleMaster.capacity
          },
        vehicleRegNo: this.vehicleDetail.vehicleRegNo,
        vehicleDoc:
          {
            id: this.vehicleDetail.vehicleDoc.id,
            documentType: {
              id: this.vehicleDetail.vehicleDoc.documentType.id,
              docType: this.vehicleDetail.vehicleDoc.documentType.docType,
            },
            docNo: this.vehicleDetail.vehicleDoc.docNo,
            desc: this.vehicleDetail.vehicleDoc.desc
          }
      })
    })
  }

  selectVehicle(brandId) {
    console.log(brandId);
    this.restService.getRequest(`${HostConfig.hostUrl}/vehicleMaster/parent/${brandId}`).subscribe(data => {
      this.vehicleNames = data;
    });
  }

  editPerDetails() {
    this.user = this.perDetailsForm.value;
    this.restService.putRequest(`${HostConfig.hostUrl}/user/${this.user.id}`, JSON.stringify(this.user));
  }
  convertPerData(): string {
    return ;
  }

  editComDetails() {
    console.log("Edit Company Details");
    this.company = this.comDetailsForm.value;
    this.restService.putRequest(`${HostConfig.hostUrl}/companyDetails/${this.company.id}`, JSON.stringify(this.company));
  }

  editVechDetails() {
    this.vehicleDetail = this.vechDetailsForm.value;
    this.restService.putRequest(`${HostConfig.hostUrl}/vehicleDetails/${this.vehicleDetail.id}`, JSON.stringify(this.vehicleDetail))
  }

  cancelDetails(str:string){
    if(str==='0'){
      this.personalDetailEdit=false;
    }
    if(str==='1'){
      this.companyDetailEdit=false;
    }
    if(str==='2'){
      this.vehicleDetailEdit=false;
    }
    
  }


}