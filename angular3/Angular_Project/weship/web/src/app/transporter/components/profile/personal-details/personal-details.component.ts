import { HostConfig } from './../../../../services/host-config';
import { Component, OnInit } from '@angular/core';
import { RestService } from './../../../../services/rest.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-personaldetails',
    templateUrl: './personal-details.component.html',
    styleUrls: ['./personal-details.component.css']
  })

  export class PersonalComponent implements OnInit {
     personalDetailEdit = false;
     perDetailsForm: FormGroup;
     user: User = new User();
     transporter: Transporter;

     constructor(private _formBuilder: FormBuilder, private restService: RestService, private route: ActivatedRoute) { }
    ngOnInit() {
        let id =19; //this.route.snapshot.params['id'];
        console.log(id);
        this.perDetailsForm = this._formBuilder.group({
            fName: [null],
            lName: [null],
            email: [null],
            mobile: [null]
      })

      this.restService.getRequest(`${HostConfig.hostUrl}/transporter/${id}`).subscribe(data => {
        this.transporter = <Transporter>data; 
        /*user */
        this.user = this.transporter.user;
        this.perDetailsForm.patchValue({
            fName: this.user.fName,
            lName: this.user.lName,
            email: this.user.email,
            mobile: this.user.mobile
          });

    })
    }

    editPerDetails() {
        this.user = this.perDetailsForm.value;
        this.restService.putRequest(`${HostConfig.hostUrl}/user/${this.user.id}`, JSON.stringify(this.user));
      }
      convertPerData(): string {
        return ;
      }
  }

  export class Transporter {
    id: number;
    user: User;
  
  }

  export class User {
    id: number;
    fName: string;
    lName: string;
    email: string;
    mobile: string;
  }