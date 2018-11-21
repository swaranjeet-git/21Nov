import { Component, OnInit, Input, ElementRef, ViewChild, DoCheck, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { DataPush } from '../dataPush.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-appliancesform',
  templateUrl: './appliancesform.component.html',
  styleUrls: ['./appliancesform.component.css']
})
export class AppliancesFormComponent implements OnInit, DoCheck, OnDestroy {

  @Output('changeCat')
  changeCatEvent = new EventEmitter();
  @Output('formSubmit')
  formSubmit = new EventEmitter<FormGroup>();
  @ViewChild('myFocus')
  private _inputTextElement: ElementRef;

  displayTypeText = false;
  myGroup = new FormGroup({
    'type' : new FormControl(null, Validators.required),
    'length': new FormControl(null),
    'width': new FormControl(null),
    'height': new FormControl(null),
    'sizeUnit': new FormControl(null),
    'weight': new FormControl(null),
    'weightUnit': new FormControl(null),
    'qty': new FormControl(1, Validators.required),
    'desc': new FormControl(null)
  });

  appliancesType = [
    {
      name: 'Television / TV',
      id : '1'
    },
    {
      name: 'Washing Machine',
      id : '2'
    },
    {
      name: 'Refrigerators',
      id : '3'
    },
    {
      name: 'Air Conditioners',
      id : '4'
    },
    {
      name: 'Geysers',
      id : '5'
    },
    {
      name: 'Kitchen Appliances',
      id : '6'
    },
    {
      name: 'Others',
      id : '-1'
    }
  ];

  constructor(private _dataPush: DataPush) { }

  ngOnInit() {
    this._dataPush.pushEvent.subscribe(val => {
      this.formSubmit.emit(this.myGroup);
    });
    console.log('vij');
    console.log(this.myGroup.get('type'));
  }

  displayText() {
    if ( this.myGroup.get('type').value === 'Others' ) {
      this.myGroup.addControl('name', new FormControl('', Validators.required));
      this.displayTypeText = true;
    this._inputTextElement.nativeElement.focus();
    } else {
      if (this.myGroup.contains('name')) {
        this.myGroup.removeControl('name');
      }
      this.displayTypeText = false;
    }
  }
  uploadImage(processedFiles) {
    console.log(processedFiles);
    // this.uploadFile = processedFiles;
    this.myGroup.addControl('uploadImg', new FormControl(processedFiles));
    // console.log(this.uploadFile);
  }

  selectedCategoryReset() {
    this.changeCatEvent.emit('');
  }

  ngDoCheck() {
    // console.log('ngDoCheck');
    this.formSubmit.emit(this.myGroup);
  }
  ngOnDestroy() {
    // console.log('ngOnDestroy');
    // this._dataPush.pushEvent.unsubscribe();
  }
}
