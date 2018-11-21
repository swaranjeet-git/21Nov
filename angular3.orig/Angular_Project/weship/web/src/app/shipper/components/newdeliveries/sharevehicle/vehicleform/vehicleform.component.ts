import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Output,  EventEmitter } from '@angular/core';
import { DataPush } from '../dataPush.service';
import { RestService } from '../../../../../services/rest.service';

@Component({
  selector: 'app-vehicleform',
  templateUrl: './vehicleform.component.html',
  styleUrls: ['./vehicleform.component.css']
})
export class VehicleFormComponent implements OnInit {

  vehicleBrands;
  selectedCategory;
  @Output('changeCat')
  changeCatEvent = new EventEmitter();
  @Output('formSubmit')
  formSubmit  = new EventEmitter<FormGroup>();

  @ViewChild('myFocus')
  private _inputElement: ElementRef;
  uploadFile;
  myGroup = new FormGroup({
    'brand': new FormControl(null, Validators.required),
    'name': new FormControl(null, Validators.required),
    'rtoNumber': new FormControl(null),
    'qty': new FormControl(1, Validators.required),
    'desc': new FormControl(null)
  });

  constructor(private _dataPush: DataPush, private _restService : RestService) { }

  ngOnInit() {
    this._inputElement.nativeElement.focus();
    this._dataPush.pushEvent.subscribe(val => {
      this.formSubmit.emit(this.myGroup);
    });
  }

  ngAfterViewInit(): void {
    //this.getVehiclesBrand();
  }

  selectedCategoryReset() {
    this.changeCatEvent.emit('');
  }

  uploadImage(processedFiles) {
    console.log(processedFiles);
    // this.uploadFile = processedFiles;
    this.myGroup.addControl('uploadImg', new FormControl(processedFiles));
    // console.log(this.uploadFile);
  }
  otherBrandName(control: AbstractControl) {
      // if(control.parent && control.parent.value.brand == "999999" && control.parent.name.value)
      // {
      //   return null;
      // }
      // return {"Other brand name required " : true};;   
  }
/*
  getVehiclesBrand(){
    this._restService.getRequest(`${HostConfig.hostUrl}/vehicleMaster/parent")
                      .subscribe(brandsData => {
                          console.log("chekincg brands ", brandsData);
                          this.vehicleBrands = brandsData;
                      })
  }
*/
  checkingSubmit() {
    console.log("Hello chekcing form ", this.myGroup);
  }

  ngDoCheck() {
    // console.log("ngDoCheck");
    this.formSubmit.emit(this.myGroup);
  }
  ngOnDestroy() {
    // console.log("ngOnDestroy");
    // this._dataPush.pushEvent.unsubscribe();  
  }

// ngOnChanges()
// {
//   console.log("ngOnChanges");
  
// }
// ngAfterContentInit()
// {
//   console.log("ngAfterContentInit");
  
// }
// ngAfterContentChecked()
// {
//   console.log("ngAfterContentChecked");
  
// }
// ngAfterViewInit()
// {
//   console.log("ngAfterViewInit");
  
// }
// ngAfterViewChecked()
// {
//   console.log("ngAfterViewChecked");
  
// }


}
