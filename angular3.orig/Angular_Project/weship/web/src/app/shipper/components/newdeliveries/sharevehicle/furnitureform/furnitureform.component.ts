import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Output,  EventEmitter } from '@angular/core';
import { DataPush } from '../dataPush.service';

@Component({
  selector: 'app-furnitureform',
  templateUrl: './furnitureform.component.html',
  styleUrls: ['./furnitureform.component.css']
})
export class FurnitureFormComponent implements OnInit, AfterViewInit {

  @Output('changeCat')
  changeCatEvent = new EventEmitter();
  @Output('formSubmit')
  formSubmit  = new EventEmitter<FormGroup>();
  @ViewChild('myFocus')
  private _inputTextElement: ElementRef;
  uploadFile;
  furnitureType = [
    {
      name: 'Table',
      id : '1'
    },
    {
      name: 'Chairs',
      id : '2'
    },
    {
      name: 'Bed',
      id : '3'
    },
    {
      name: 'Dining',
      id : '4'
    },
    {
      name: 'Aalmari',
      id : '5'
    },
    {
      name: 'Bean Bags',
      id : '5'
    },
    {
      name: 'Others',
      id : '999999'
    }
  ];
  displayTypeText = false;
  myGroup = new FormGroup({
    'type': new FormControl(null, Validators.required),
    'length': new FormControl(null),
    'width': new FormControl(null),
    'height': new FormControl(null),
    'sizeUnit': new FormControl(null),
    'weight': new FormControl(null),
    'weightUnit': new FormControl(null),
    'qty': new FormControl(1, Validators.required),
    'desc': new FormControl(null),
  });
   constructor(private _dataPush: DataPush) { }

  ngOnInit() {
    // this._inputTextElement.nativeElement.focus();
    // this._dataPush.pushEvent.subscribe(val => {
    //   this.formSubmit.emit(this.myGroup);
    // });
  }

  ngAfterViewInit(): void {
      // this._inputElement.nativeElement.focus();
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
    // console.log(processedFiles);
    // this.uploadFile = processedFiles;
    this.myGroup.addControl('uploadImg', new FormControl(processedFiles));
    // console.log(this.uploadFile);
  }
  selectedCategoryReset() {
    this.changeCatEvent.emit('');
  }

  ngDoCheck() {
    // console.log("ngDoCheck");
    this.formSubmit.emit(this.myGroup);
  }
  ngOnDestroy()  {
    // console.log("ngOnDestroy");
    // this._dataPush.pushEvent.unsubscribe();  
  }
}
