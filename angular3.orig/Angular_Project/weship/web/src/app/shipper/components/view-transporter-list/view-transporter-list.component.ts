import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray,FormControl, Validators } from '@angular/forms'
import { RestService } from './../../../services/rest.service';
import { HostConfig } from './../../../services/host-config';
import { CookieService } from 'ngx-cookie';
import { Transporter } from '../../../shared/modal/transporter';

@Component({
  selector: 'app-view-transporter-list',
  templateUrl: './view-transporter-list.component.html',
  styleUrls: ['./view-transporter-list.component.css']
})
export class ViewTransporterListComponent implements OnInit {

  transporter:Transporter;
  myProfile : FormGroup;
  personalDetails: FormGroup;
  fb:FormBuilder;
  constructor(private restService : RestService, private _cookieService : CookieService) { }

  ngOnInit() 
  {

    this.restService.getRequest(`${HostConfig.hostUrl}/transporter`).subscribe(data=>{

      this.transporter=<Transporter>data;
    
    
          
    },error=>{

    })

    
    
    
  }//ngOnInit

  
}
export class TableBasicExample extends ViewTransporterListComponent {
  displayedColumns: string[] = ['Name', 'Mobile', 'Email'];
  dataSource = this.transporter;
}