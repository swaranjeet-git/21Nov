// import { FilterEvent } from './../leftPanel/filter.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from '../../../services/rest.service';
import { trigger, state, animate, transition, style } from '@angular/animations';

@Component({
  selector: 'app-transporter-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [],
  animations: [
    trigger('visibilityLeftNav', [
      // state('hide', style({ opacity: 1 })),
      // state('visible', style({ opacity: 0, background: 'white' })),
      // transition('hide => visible', animate('2s', style({ opacity: 1, background: 'black'}))),
      // transition('visible => hide', animate('2s', style([ { opacity: 1, background: 'red' }])))
    ])],
})
export class HomeComponent implements OnInit {

  isOpen = false;
  constructor(private router: Router, private route: ActivatedRoute, private _restService: RestService) { }

  ngOnInit() {
}
drawerOpenedChange(event) {
  // console.log(event);
  this.isOpen = event;
}

}
