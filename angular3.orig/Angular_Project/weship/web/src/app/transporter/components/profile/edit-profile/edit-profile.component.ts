import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray,FormControl, Validators } from '@angular/forms'
import { User } from '../../../../shared/modal/user';
import {CompanyDetails} from '../../../../shared/modal/company'
import { Transporter } from '../../../../shared/modal/transporter';
import { VehicleMaster } from '../../../../shared/modal/vehicleModal';
import { VehicleDetail } from '../../../../shared/modal/transporter';
import { RestService } from './../../../../services/rest.service';
import { CookieService } from 'ngx-cookie';
import { HostConfig } from './../../../../services/host-config';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  myProfile : FormGroup;
  personalDetails : FormGroup;
  companyDetails : FormGroup;
  vehicleDetail:FormGroup;
  user:User;
  company :CompanyDetails;
  transporter:Transporter;
  vehicleMaster:VehicleMaster;
  brands;
  docTypes;
  vehicleNames;
  vehicles;
  vehicleArray:FormArray;
  vehicle : VehicleDetail;
  loggedInUser;
  constructor(private fb: FormBuilder, private restService : RestService, private _cookieService : CookieService  ) { }

  ngOnInit() {
    this.loggedInUser = this._cookieService.get('ut');
    console.log("==> "+this.loggedInUser);
    this.restService.getRequest(`${HostConfig.hostUrl}/user/${this.loggedInUser}`).subscribe(data => {
      this.user=<User>data;
      (<FormArray>(this.myProfile.controls.formArray)).controls[0].patchValue({
        fName: this.user.fName,
        lName: this.user.lName,
        email: this.user.email,
        mobile: this.user.mobile
      });
      
    },error => {

    });

    this.restService.getRequest(`${HostConfig.hostUrl}/transporter/user/${this.loggedInUser}`).subscribe(data => {
      
      this.transporter=<Transporter>data;
      this.company = this.transporter.companyDetails;
      (<FormArray>(this.myProfile.controls.formArray)).controls[1].patchValue({
        companyName: this.company.companyName,
        address: this.company.address,
        city: this.company.city,
        country: this.company.country,
        pincode:this.company.pincode
      });
     
      let i=0;
      for(let vehicle of this.transporter.vehicles){

        // console.log("This is My index" + i);
        // console.log(i+"==> "+"Vehicle Reg No" + this.transporter.vehicles[i].vehicleRegNo);


        //tempV:FormArray:<FormArray>(this.myProfile.controls.vehicles);
       // console.log((<FormArray>(this.myProfile.controls.vehicles)).controls[0]);

         
        (<FormArray>(this.myProfile.controls.vehicles)).controls[i].patchValue({  
          vehicleRegNo : this.vehicle.vehicleRegNo,
          vehicleMaster:{id:this.vehicle.vehicleMaster.id, 
                          vehicleName:this.vehicle.vehicleMaster.vehicleName, 
                          brandName:this.vehicle.vehicleMaster.brandName, 
                          type:this.vehicle.vehicleMaster.type, 
                          size:this.vehicle.vehicleMaster.size, 
                          capacity:this.vehicle.vehicleMaster.capacity,
                          parent:{
                            id:this.vehicleMaster.parent.id},
                          },
          vehicleDoc:{id:this.vehicle.vehicleDoc.id, 
                      docNo:this.vehicle.vehicleDoc.docNo,
                      desc:this.vehicle.vehicleDoc.desc,
                      documentType:{
                          id:this.vehicle.vehicleDoc.documentType.id,
                          docType:this.vehicle.vehicleDoc.documentType.docType
                      }}

        });
        i++;
      }
      

      

      
    },error =>{


    });

    

    this.getVehicleBrand();
    this.selectDocType();
    this.myProfile=this.fb.group({
      vehicles:this.fb.array([]),
    formArray : this.fb.array([
     
    this.personalDetails=this.fb.group({
  
      fName:[{value:'', disabled: false}],
      lName: [{value:'', disabled: false}],
      email: [{value:'', disabled: false}],
      mobile: [{value:'', disabled: false}]
        
    
    }),
    this.companyDetails=this.fb.group({
      
  
      companyName:[{value:'', disabled: false}],
      address: [{value:'', disabled: false}],
      city: [{value:'', disabled: false}],
      country: [{value:'', disabled: false}],
      pincode: [{value:'', disabled: false}]
    }),
    this.vehicleDetail=this.fb.group     ({
        vehicleMaster: this.fb.group({
    
          parent: this.fb.group({
            id: [{value:'', disabled: false}],
          }),
          id: [{value:'', disabled: false}],
          }),
          vehicleRegNo: [{value:'', disabled: false}],
          vehicleDoc: this.fb.group({
            documentType: this.fb.group({
              id: [{value:'', disabled: false}],
            }), 
              docNo: [{value:'', disabled: false}],
              desc:[{value:'', disabled: false}]
          }),
        })
    

  
     
     ]),
})
  }//onInit

  

getVehicleBrand(){
  this.restService.getRequest(`${HostConfig.hostUrl}/vehicleMaster/parent`).subscribe(data => {
    
    this.brands = data;
    
  });
}
selectedBrand(bId){
  console.log("bId:"+bId);
  this.restService.getRequest(`${HostConfig.hostUrl}/vehicleMaster/parent/${bId}`).subscribe(data => {
    this.vehicleNames = data;
  });
}
selectDocType(){
  this.restService.getRequest(`${HostConfig.hostUrl}/doctype/`).subscribe(data => {
    this.docTypes = data;
  });
}
addPersonalDetails()
{
  this.restService.postRequest(`${HostConfig.hostUrl}/transporter`,this.convertData()).subscribe(res=>{
    this.transporter=<Transporter>res;
  })
}


convertData(){
  const data={
    user:this.myProfile.value.formArray[0],
    company:this.myProfile.value.formArray[1],
    vehicles:this.myProfile.value.vehicles
    
  }
  console.log(data);
  return JSON.stringify(data); 
  
}
}
