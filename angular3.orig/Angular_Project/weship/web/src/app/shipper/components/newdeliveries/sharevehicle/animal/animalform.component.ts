import { Component, OnInit,  Input, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Output,  EventEmitter } from '@angular/core';
import { DataPush } from '../dataPush.service';

@Component({
  selector: 'app-animalform',
  templateUrl: './animalform.component.html',
  styleUrls: ['./animalform.component.css']
})
export class AnimalFormComponent implements OnInit {

  @Output('changeCat')
  changeCatEvent = new EventEmitter();
  @Output('formSubmit')
  formSubmit  = new EventEmitter<FormGroup>();
  @ViewChild("myFocus")
  private _inputElement: ElementRef;
  myGroup = new FormGroup({
    'type': new FormControl(null, Validators.required),
    // 'name': new FormControl(null),
    'length': new FormControl(null),
    'width': new FormControl(null),
    'height': new FormControl(null),
    'sizeUnit': new FormControl(null),
    'weight': new FormControl(null),
    'weightUnit': new FormControl(null),
    'qty': new FormControl(1, Validators.required),
    'desc': new FormControl(null)
  });
  constructor(private _dataPush: DataPush) { }

  ngOnInit() {
    this._inputElement.nativeElement.focus();
    // this._dataPush.pushEvent.subscribe(val => {
      // this.formSubmit.emit(this.myGroup);
    // });
  }

  ngAfterViewInit(): void {
      // this._inputElement.nativeElement.focus();
  }


  selectedCategoryReset() {
    this.changeCatEvent.emit('');
  }

  ngDoCheck() {
    // console.log("ngDoCheck");
    this.formSubmit.emit(this.myGroup);
  }
  ngOnDestroy() {
    // console.log("ngOnDestroy");
    // this._dataPush.pushEvent.unsubscribe();  
  }
  uploadImage(processedFiles) {
    console.log(processedFiles);
    // this.uploadFile = processedFiles;
    this.myGroup.addControl('uploadImg', new FormControl(processedFiles));
    // console.log(this.uploadFile);
  }
}
