import { RestService } from './../../../../services/rest.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray,FormControl } from '@angular/forms';
import { Router} from '@angular/router'
import { log } from 'util';
import { ViewEncapsulation } from '@angular/core/src/metadata/view';
import { AbstractControl } from '@angular/forms/src/model';
import { Transporter } from '../../../../shared/modal/transporter';
import { User } from '../../../../shared/modal/user';
import { CookieService } from 'ngx-cookie';
import { HostConfig } from '../../../../services/host-config';

@Component({
  selector: 'app-transporter-data',
  templateUrl: './transporter-data.component.html',
  styleUrls: ['./transporter-data.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class TransporterDataComponent implements OnInit {

  jsonData: any;
  transporter: Transporter;
  user:User;
  fName;
  matcher;
  convertedImage;


  progressSpinner:boolean=false;
  router:Router; 
  vehicleNames;
  brands;
  docTypes;
  selServOptions = [];
  myForm: FormGroup;
  serviceOptions;
  post: any;
  description: String = '';    // A property for our submitted form
  name: String = '';
  titleAlert: String = 'This Field is Required*';
  descriptionAlert: String = 'you must Specify a description that\'s Between 200 and 500 Characters';
  disableAll = false;
  isLinear = false;
  loggedInUser;
  uploadFile;
  fileName;
  constructor(private _formBuilder: FormBuilder, private restService: RestService, private _router: Router,private _cookieService: CookieService) {

  }
  
  ngOnInit() {
    this.loggedInUser = this._cookieService.get('ut');

    this.restService.getRequest(`${HostConfig.hostUrl}/user/${this.loggedInUser}`).subscribe(data => {
      this.user=<User>data;
      //console.log(this.myForm.controls.formArray);
      
      //console.log("Name"+this.user.fName);
      (<FormArray>(this.myForm.controls.formArray)).controls[0].patchValue({
        fName: this.user.fName,
        lName: this.user.lName,
        email: this.user.email,
        mobile: this.user.mobile
      });
      // console.log((<FormArray>(this.myForm.controls.formArray)).controls[0]);
      
    }, error => {
   });

    this.myForm = this._formBuilder.group(
      {
        formArray: this._formBuilder.array([
          this._formBuilder.group({
            // fName: [null, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')] ],
            // lName: [{value:'', disabled: true}, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')] ],
            // email: [{value:'', disabled: true} , [Validators.required, Validators.email] ],
            // mobile: [{value:'', disabled: true} , [Validators.required, Validators.pattern('[0-9]*'),
            // Validators.compose([Validators.minLength(10), Validators.maxLength(10)])] ]
            fName:[{value:'', disabled: true}],
            lName: [{value:'', disabled: true}],
            email: [{value:'', disabled: true}],
            mobile: [{value:'', disabled: true}]

          }),
          this._formBuilder.group({
            companyName: [null, [Validators.required] ],
            address: [null, [Validators.required] ],
            city: [null, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
            country: [null, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
            pincode: [null, [Validators.required, Validators.pattern('[0-9]*')]],

          }),
          this._formBuilder.group({
            interests: [null]
          }),
          this._formBuilder.group({
            vehicleMaster: this._formBuilder.group({

              parent: this._formBuilder.group({
                id: [null],
              }),
              id: [null],
              }),
              vehicleRegNo: [null],
              vehicleDoc: this._formBuilder.group({
                documentType: this._formBuilder.group({
                  id: [null],
                }),
                docNo: [null],
                desc: [null],
              }),
          })
        ])
      });

      console.log((<FormArray>(this.myForm.controls.formArray)).controls[0]);

    this.restService.getRequest(`${HostConfig.hostUrl}/genericresource`).subscribe(data => {
      this.serviceOptions = data;
    });

    this.restService.getRequest(`${HostConfig.hostUrl}/vehicleMaster/parent`).subscribe(data => {
      this.brands = data;
    });

    this.restService.getRequest(`${HostConfig.hostUrl}/doctype/`).subscribe(data => {
      this.docTypes = data;
    });

    /* this.restService.getRequest(`${HostConfig.hostUrl}/transporter/24`).subscribe(data => {

      this.jsonData = JSON.stringify(data);

      console.log("this.jsonData " + this.jsonData);
      this.transporter = JSON.parse(this.jsonData);
      this.fName = this.transporter.user.fName;


     

    }); */


  }
  get formArray(): AbstractControl | null { return this.myForm.get('formArray'); }

  showEvent(event) {
    let i = this.selServOptions.indexOf(event)
    if(i==-1){
      this.selServOptions.push(event);
    } else {
      this.selServOptions.splice(i,1);
    }
      this.disableAll = this.selServOptions.indexOf('0') >=0;
  }

  saveData() {
    this.progressSpinner=true;
    this.myForm.value.formArray[2].interests = this.selServOptions;
    console.log(this.convertData());
    console.log(this.uploadFile);
    this.restService.postRequest(`${HostConfig.hostUrl}/transporter`, this.convertData()).subscribe(res => {
      console.log('this.fileName :' + this.uploadFile);
      this.transporter=<Transporter>res;
      const firstconvertedImage = this.convertedImage;
      // var file = new File(this.uploadFile, this.uploadFile[0].name, {type: this.uploadFile[0].type, lastModified: this.uploadFile[0].lastModified});
      // var fd = new FormData();
      //           console.log(file);
      //           fd.append("files", file);
      //           fd.append("extraField","vijay");
      //           this.restService.postFormRequest(`${HostConfig.hostUrl}/upload/image/`, fd );

      if (firstconvertedImage && firstconvertedImage.length > 0) {
        if (firstconvertedImage[0] instanceof File) {
          const file = firstconvertedImage[0];
          const fd = new FormData();
          console.log(file);
          fd.append('image', file);
          fd.append('type', 'vehicle');
          this.restService.postFormRequest(`${HostConfig.hostUrl}/image/upload/${(<{ id: number }>res).id}`, fd);
        } else {
          const file = new File(firstconvertedImage, firstconvertedImage[0].name
            , { type: firstconvertedImage[0].type, lastModified: firstconvertedImage.lastModified });
          const fd = new FormData();
          console.log(file);
          fd.append('image', file);
          fd.append('type', 'vehicle');
          this.restService.postFormRequest(`${HostConfig.hostUrl}/image/upload/${(<{ id: number }>res).id}`, fd);
        }
      }
                
      this.progressSpinner=false;
      this._router.navigate(['transporter']);
    },
  error => {
    this.progressSpinner = false;
   });
   
                

  }

  convertData() {
    const data = { user: {id: this.loggedInUser},
      companyDetails: this.myForm.value.formArray[0],
      interestedIn: this.myForm.value.formArray[1].interests,
      vehicleDetail: this.myForm.value.formArray[2]
      };
      return JSON.stringify(data);
  }

  selectVehicle(bId) {
console.log(bId);

    this.restService.getRequest(`${HostConfig.hostUrl}/vehicleMaster/parent/${bId}`).subscribe(data => {
      this.vehicleNames = data;
    });

  }
  uploadImage(processedFiles){
    
    
    // this.uploadFile = processedFiles;
    // (<FormGroup>((<FormArray>(this.myForm.controls.formArray)).controls[3])).addControl('uploadImg',new FormControl(this.uploadFile[0].name));
    this.convertedImage = processedFiles;
        
  }

}


 /* export class VehicleMaster {
  vehicleName: string;
  brandName: string;
  size: string;
  image: string;
} */



/*
export class VehicleDetail {
  brand: string;
  type: string;
  capacity: string;} */