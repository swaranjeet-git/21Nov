import { Component, OnInit, Input, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Output,  EventEmitter } from '@angular/core';
import { RestService } from '../../../../../services/rest.service';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-submitform',
  templateUrl: './submitform.component.html',
  styleUrls: ['./submitform.component.css']
})
export class SubmitFormComponent implements OnInit {

  submitForm: FormGroup;
  @Output('formSubmit')
  formSubmitEvent  = new EventEmitter<FormGroup>();
  minDate = new Date();
  


  constructor(private _restService: RestService) {
  }

  ngOnInit() {
    this.submitForm = new FormGroup({
      'fromLoc': new FormControl(),
      'toLoc': new FormControl(),
      'fromDate': new FormControl(),
      'toDate': new FormControl()
    });

  }

  FromLocChange(event)
  {
    this.submitForm.get('fromLoc').setValue(event);
    
  }
  ToLocChange(event)
  {
    this.submitForm.get('toLoc').setValue(event);
    console.log(this.submitForm);
  }


  ngDoCheck()
{
  // console.log("ngDoCheck");
  this.formSubmitEvent.emit(this.submitForm);
}

}
