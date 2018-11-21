import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { RestService } from '../../../../services/rest.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { DataPush } from './dataPush.service';
import { timeout } from 'q';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { LoginEvent } from '../../../../services/login-event';
import { MatSnackBar } from '@angular/material';
import { HostConfig } from '../../../../services/host-config';

@Component({
  selector: 'app-component-sharevehicle',
  templateUrl: './sharevehicle.component.html',
  styleUrls: ['./sharevehicle.component.css'],
  providers: [DataPush]
})
export class ShareVehicleComponent implements OnInit {

  progressSpinner = false;
  categories;
  parentId = 0;
  _ref: any;
  clicked: [{ id: number, name: String }] = [{ id: 0, name: 'const us help you to find a right Vehicle for you' }
    // , {id:1, name :'vehicle'}
    // , {id:2, name :'car'}
  ];
  addInputs = [];

  // itemForms: FormGroup[] = [];
  itemForms = new FormArray([]);
  locForm: FormGroup = new FormGroup({
    // firstName: new FormControl()
  });

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  step = 0;
  disableContinue = true;


  @ViewChild('searchMap')
  public searchElementRef: ElementRef;

  constructor(private router: Router
    , private _restService: RestService
    , private mapsAPILoader: MapsAPILoader
    , private loginEvent: LoginEvent
    , private _cookieService: CookieService
    , private ngZone: NgZone
    , public snackBar: MatSnackBar
    , private _dataPush: DataPush) {
  }

  setStep(index: number) {
    this.step = index;

  }

  loggedInUserId;
  loggedInUser;

  ngOnInit() {

    this.loggedInUserId = this._cookieService.get('ut');
    if (this.loggedInUserId) {
      this.loggedInUser = this._cookieService.getObject('user');
    }

    this.addInputs.push({ selectedCategory: '', title: '' });
    const tempFormGroup = new FormGroup({ 'ng': new FormControl(null, Validators.required) });
    this.itemForms.controls.push(tempFormGroup);

    if (this.parentId === 0) {
      this._restService.getRequest(`${HostConfig.hostUrl}/itemtype/parent/`).subscribe(res => {
        this.categories = res;
      });
    } else {
      this.loadChilds();
    }

    // set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    // create search FormControl
    this.searchControl = new FormControl();

    // set current position
    this.setCurrentPosition();

    // load Places Autocompconste
    this.mapsAPILoader.load().then(() => {
      // const autocompconste = new google.maps.places.Autocompconste(this.searchElementRef.nativeElement, {
      //   types: ['address']
      // });


      // autocompconste.addListener('place_changed', () => {
      //   this.ngZone.run(() => {
      //     //get the place result
      //     const place: google.maps.places.PlaceResult = autocompconste.getPlace();

      //     //verify result
      //     if (place.geometry === undefined || place.geometry === null) {
      //       return;
      //     }

      //     //set latitude, longitude and zoom
      //     this.latitude = place.geometry.location.lat();
      //     this.longitude = place.geometry.location.lng();
      //     this.zoom = 12;
      //   });
      // });
    });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  showcategorynav(categoryclicked, index) {
    for (let i = this.clicked.length; i > index; i--) {
      this.clicked.pop();
    }
    this.showcategory(categoryclicked);
  }

  showcategory(categoryclicked) {
    this.parentId = categoryclicked.id;
    this.clicked.push({ id: categoryclicked.id, name: categoryclicked.name });
    // const link = '<a rel='nofollow' routerLink='.'' (click)='showcategogy(category)'' >'+ categoryclicked.name+ '</a>'
    // this.clicked = link+`>`
    if (this.parentId === 0) {
      this._restService.getRequest(`${HostConfig.hostUrl}/itemtype/parent/`).subscribe(res => {
        this.categories = res;
      });
    } else {
      this.loadChilds();
    }
  }
  loadChilds() {
    this._restService.getRequest(`${HostConfig.hostUrl}/itemtype/parent/${this.parentId}`).subscribe(res => {
      this.categories = res;
    });
  }

  addNewItem() {
    this.addInputs.push({ selectedCategory: '' });
    const tempFormGroup = new FormGroup({ 'ng': new FormControl(null, Validators.required) });
    this.itemForms.controls.push(tempFormGroup);
    this.setStep(this.addInputs.length - 1);
  }

  addSameItem(index) {
    this.addInputs.push({ selectedCategory: this.addInputs[index].selectedCategory, title: this.addInputs[index].title, category: this.addInputs[index].category  });
    const tempFormGroup = new FormGroup({ 'ng': new FormControl(null, Validators.required) });
    this.itemForms.controls.push(tempFormGroup);
    this.setStep(this.addInputs.length - 1);
  }
  error() {
    console.log('error');

  }

  delListing(index: number) {
    this.addInputs.splice(index, 1);
    this.itemForms.removeAt(index);
    this.setStep(this.addInputs.length - 1);
    // (this.addInputs).removeAt(index);
  }


  // ngDoCheck() {
  //   // this.itemForms.setErrors({'firstError': 'firstError'});
  // }

  formSubmit(formGroup: FormGroup, index) {
    this.itemForms[index] = formGroup;
    // console.log(this.itemForms);
    this.itemForms.controls[index] = formGroup;
    formGroup.setParent(this.itemForms);
  }

  setCategory(cat, index) {
    // this.itemForms.setErrors(null);
    console.log('category receieved:');
    console.log(cat);
    this.addInputs[index].selectedCategory = cat.type;
    this.addInputs[index].title = cat.name;
    this.addInputs[index].category = cat;
    if (!cat) {
      this.itemForms[index] = (new FormGroup({}));
    }
  }
  selectedCategoryReset(index) {
    this.addInputs[index].selectedCategory = '';
  }

  getValid() {
    let validCount = 0;
    let touchCount = 0;

    this.itemForms.controls.forEach(element => {
      element.touched ? touchCount++ : touchCount;
      (element.touched && element.valid) ? validCount++ : validCount;
    });
    if (touchCount === 0) {
      return true;
    }
    if (validCount) {
    this.disableContinue = false;
    } else {
      this.disableContinue = true;
    }
    return this.disableContinue;
  }

  LocationFormSubmit(event) {
    this.locForm = event;

  }


  onSubmit() {

    if (this.loggedInUserId) {

      if (this.itemForms.valid && this.locForm.valid) {
        this.progressSpinner = true;
        this.locForm.value.shared = true;
        this.locForm.value.userId = this.loggedInUserId;
        this.locForm.value.name = `${this.loggedInUser.fName} ${this.loggedInUser.lName}`;
        this.locForm.value.status = 'draft';
        this.locForm.value.fromLatLng = `${this.locForm.value.fromLoc.latlng.lat},${this.locForm.value.fromLoc.latlng.lng}`;
        this.locForm.value.toLatLng = `${this.locForm.value.toLoc.latlng.lat},${this.locForm.value.toLoc.latlng.lng}`;
        this.locForm.value.fromLocGoogle = JSON.stringify(this.locForm.value.fromLoc);
        this.locForm.value.toLocGoogle = JSON.stringify(this.locForm.value.toLoc);
        this.locForm.value.count = this.itemForms.value.length;
        this.locForm.value.summary = this.itemForms.value.reduce((carry, element) => 
            carry + (element.name ? element.name : element.type) + ', ', '');
        console.log(this.locForm.value);
        console.log(JSON.stringify(this.locForm.value));
        this._restService.postRequest(`${HostConfig.hostUrl}/listing`,
          JSON.stringify(this.locForm.value)).subscribe(res => {
            const list = <Listing>res;
            this.itemForms.value.forEach((element, index) => {
              this._restService.postRequest(`${HostConfig.hostUrl}/listItem`,
                JSON.stringify({
                  listId: list.id,
                  categoryId: this.addInputs[index].category.id,
                  category: this.addInputs[index].selectedCategory,
                  categoryName: this.addInputs[index].category.name,
                  detail: JSON.stringify(element)
                }
                )).subscribe(resp => {
                  this.progressSpinner = false;
                  if (element.uploadImg) {
                    const file = new File(element.uploadImg, element.uploadImg.name
                      , {type: element.uploadImg.type, lastModified: element.uploadImg.lastModified});
                    const fd = new FormData();
                    console.log(file);
                    fd.append('image', file);
                    fd.append('type', 'item');
                    this._restService.postFormRequest(`${HostConfig.hostUrl}/image/upload/${(<{id: number}>resp).id}`, fd );
                  }
                  console.log('insertion successfull');
                });
                console.log(element.uploadImg);
            });
            this.router.navigate(['shipper']);
          });
          setTimeout(() => {
            this.progressSpinner = false;
          }, 5000);
      } else {
        this.snackBar.open('Please fill all mendotry information', '', {
          duration: 5000,
        });
      }
    } else {
      this.loginEvent.canActivateEvent.emit();
    }
  }
  onContinue() {
    // console.log(this.itemForms);

    // this._dataPush.pushEvent.emit();
  }


}

export class Listing {
  id: number;
}
