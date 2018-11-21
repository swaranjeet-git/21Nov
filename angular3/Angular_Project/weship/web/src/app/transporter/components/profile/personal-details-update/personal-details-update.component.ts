import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray,FormControl, Validators } from '@angular/forms'
import { RestService } from './../../../../services/rest.service';
import { HostConfig } from './../../../../services/host-config';
import { CookieService } from 'ngx-cookie';
import { User } from '../../../../shared/modal/user';
import { Transporter } from '../../../../shared/modal/transporter';
import { VehicleMaster } from '../../../../shared/modal/vehicleModal';
import { DocumentType } from '../../../../shared/modal/vehicleModal';


@Component({
  selector: 'app-personal-details-update',
  templateUrl: './personal-details-update.component.html',
  styleUrls: ['./personal-details-update.component.css']
})
export class PersonalDetailsUpdateComponent implements OnInit {
 
  myProfile : FormGroup;
  personalDetails : FormGroup;
  companyDetails : FormGroup;
  vehicleDetail:FormGroup;
  user:User;
  transporter:Transporter;
  vehicleMaster:VehicleMaster;
  brands;
  docTypes;
  vehicleNames;
  vehicles;
  vehicleArray:FormArray;
  loggedInUser;

  
    constructor(private fb: FormBuilder, private restService : RestService, private _cookieService : CookieService  ) { }
  
    ngOnInit() {
     this.loggedInUser = this._cookieService.get('ut');
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
    this.getVehicleBrand();
    this.selectDocType();
    this.myProfile=this.fb.group({
      vehicles:this.fb.array([]),
    formArray : this.fb.array([
     
    this.personalDetails=this.fb.group({
      id:[null],
      fName: new FormControl("",Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.pattern('^[a-zA-Z\s]+$')
      ])),
      lName: new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z\s]+$')
  ])),
      gender:[null],
      email:[null],
      mobile:[null]
  // fName:[{value:'', disabled: true}],
  // lName: [{value:'', disabled: true}],
  // email: [{value:'', disabled: true}],
  // mobile: [{value:'', disabled: true}]
    
    }),
    this.companyDetails=this.fb.group({
  
      companyName:  new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z\s]+$')
  ])),
      address:  new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[a-zA-Z\s]+$')
  ])),
      city:  new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z\s]+$')
  ])),
      country: new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z\s]+$')
  ])),
      pincode:  new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^[0-9\d]+$')
  ]))
    }),
  

  // this.vehicleDetail=this.fb.group     ({
  //   vehicleMaster: this.fb.group({

  //     parent: this.fb.group({
  //       id: [null],
  //     }),
  //     id: [null],
  //     }),
  //     vehicleRegNo: [null],
  //     vehicleDoc: this.fb.group({
  //       documentType: this.fb.group({
  //         id: [null],
  //       }), 
  //         docNo: [null],
  //         desc: [null]
  //     }),
  //   })

 
     
     ]),
})
}//onInit


get vehicleForms(){
   
  return this.myProfile.get('vehicles') as FormArray
}

addvehicle()
{
  const vehicle=this.fb.group
  ({
    vehicleMaster: this.fb.group({

      parent: this.fb.group({
        id: [''],
      }),
      id: [''],
      }),
      cover :[null],
      vehicleRegNo: [null],
      vehicleDoc: this.fb.group({
        documentType: this.fb.group({
          id: [null],
        }), 
          docNo: [null],
         desc: [null],
      }),
    })
    


    this.vehicleForms.push(vehicle);
}

deleteVehicle(x)
{
  this.vehicleForms.removeAt(x);
}
  

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
     // console.log(this.myProfile.value.vehicles);
      //this.convertData();
    }
    
    convertData(){
      const data={
        user: {id: this.loggedInUser},
        //user:this.myProfile.value.formArray[0],
        companyDetails:this.myProfile.value.formArray[1],
        vehicles:this.myProfile.value.vehicles
        
      }
      console.log(data);
      return JSON.stringify(data);
        
      
    }

    
  
     
    }
    