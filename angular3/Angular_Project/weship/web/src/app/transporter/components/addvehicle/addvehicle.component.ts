import { FilterEvent } from './../leftPanel/filter.service';
import { Component, OnInit, Input, OnDestroy, AfterViewInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { RestService } from '../../../services/rest.service';
import { LocationUtility } from '../../../services/location-utility';
import { HostConfig } from '../../../services/host-config';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';



@Component({
  selector: 'app-addvehicle',
  templateUrl: './addvehicle.component.html',
  styleUrls: ['./addvehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  arrayFeet: any[] = [];
  arrayInch: any[] = [];
  arrayTon: any[] = [];
  array100Kg: any[] = [];
  arrayKg: any[] = [];
  wheelTypes: any[] = [];
  brands;
  brandName;
  dataSource;
  orderList;
  filter;
  addVehicleForm: FormGroup;
  upImage;
  addvehicleData;
  // updated kish add on 16March
  successFlag;
  // end updated kish add on 16March
  public convertedImage;
  constructor(private _restService: RestService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initialdata();

    this.addVehicleForm = this._formBuilder.group({
      vName: [null],
      parent: this._formBuilder.group({
        id: [null],
      }),
      //vBrand: [null],
      vType: [null],
      vHeightFeet: [null],
      vHeightInch: [null],
      vLenghtFeet: [null],
      vLenghtInch: [null],
      vWidthFeet: [null],
      vWidthInch: [null],
      vWeightTon: [null],
      vWeightQuintal: [null],
      vWeightKg: [null],
      uploadImg: [null]
    })


  }

  initialdata() {
    this._restService.getRequest(`${HostConfig.hostUrl}/vehicleMaster/parent`).subscribe(data => {
      this.brands = data;
    });
    this.arrayFeet = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
    this.arrayInch = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    this.arrayTon = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    this.array100Kg = ['0', '100', '200', '300', '400', '500', '600', '700', '800', '900', '1000', '1100', '1200'];
    this.arrayKg = ['10', '20', '30', '40', '50', '60', '70', '80', '90'];
    this.wheelTypes = ['Three Wheeler', 'Four Wheeler', 'Six Wheeler', 'Eight Wheeler'];
  }
  // kish add on 16March
  addNewVehicle(){
    this.successFlag = false;
    window.location.reload();
  }
  // kish add on 16March
  addVehicle() {
    console.log(this.convertData());
    console.log('==> ' + this.addVehicleForm.get('parent').value);
    console.log('==> ' + (this.addVehicleForm.get('parent')).get('id').value);
    const firstconvertedImage = this.convertedImage;
    this._restService.postRequest(`${HostConfig.hostUrl}/vehicleMaster`, this.convertData()).subscribe(vehicleres => {
      this.addvehicleData = vehicleres;
      if (firstconvertedImage && firstconvertedImage.length > 0) {
        if (firstconvertedImage[0] instanceof File) {
          const file = firstconvertedImage[0];
          const fd = new FormData();
          console.log(file);
          fd.append('image', file);
          fd.append('type', 'vehicle');
          this._restService.postFormRequest(`${HostConfig.hostUrl}/image/upload/${(<{ id: number }>vehicleres).id}`, fd);
          this.successFlag = true;
        } else {
          const file = new File(firstconvertedImage, firstconvertedImage[0].name
            , { type: firstconvertedImage[0].type, lastModified: firstconvertedImage.lastModified });
          const fd = new FormData();
          console.log(file);
          fd.append('image', file);
          fd.append('type', 'vehicle');
          this._restService.postFormRequest(`${HostConfig.hostUrl}/image/upload/${(<{ id: number }>vehicleres).id}`, fd);
          this.successFlag = true;
        }
      }
      
    },
      (error) => {
        console.log("Vehicle not added");

      });
  }

  convertData() {
    return JSON.stringify(
      {
        'vehicleName': this.addVehicleForm.get('vName').value,
        'brandName': this.getBrandName(),
        'parent': this.addVehicleForm.get('parent').value,
        'type': this.addVehicleForm.get('vType').value,
        'size': this.addVehicleForm.get('vHeightFeet').value + '.' + this.addVehicleForm.get('vHeightInch').value
          + '(H) * ' + this.addVehicleForm.get('vLenghtFeet').value + '.' + this.addVehicleForm.get('vLenghtInch').value
          + '(L) * ' + this.addVehicleForm.get('vWidthFeet').value + '.' + this.addVehicleForm.get('vWidthInch').value + '(W)',
          // updated kish add on 16March
        'capacity': this.addVehicleForm.get('vWeightTon').value + 'Ton ' + this.addVehicleForm.get('vWeightQuintal').value + 'Quintal ' + this.addVehicleForm.get('vWeightKg').value + 'Kgs',
        // end updated kish add on 16March
      }

    )
  }
  getBrandName() {
    this.brands.forEach(brand => {
      if (brand.id === (this.addVehicleForm.get('parent')).get('id').value) {
        this.brandName = brand.brandName;
      }
    });
    return this.brandName;
  }

  uploadImage(processedFiles) {
    // console.log(processedFiles);
    // this.uploadFile = processedFiles;
    this.convertedImage = processedFiles;
    // console.log(this.uploadFile);
  }



}



