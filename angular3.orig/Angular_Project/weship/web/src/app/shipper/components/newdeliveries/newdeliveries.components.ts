import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../services/rest.service';

@Component({
  selector: 'app-component-newship',
  templateUrl: './newdeliveries.component.html',
  styleUrls: ['./newdeliveries.component.css']
})
export class NewDeliveryComponent implements OnInit {

  constructor(private _restService: RestService) { }

  ngOnInit() {
  }
}
