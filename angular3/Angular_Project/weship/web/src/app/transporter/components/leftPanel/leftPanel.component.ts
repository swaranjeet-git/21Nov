import { FilterEvent } from './filter.service';
import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-leftPanel',
  templateUrl: './leftPanel.component.html',
  styleUrls: ['./leftPanel.component.css']
})
export class LeftPanelComponent implements OnInit {

  listingType = -1;
  listingTypes =
    [
      { value: -1, viewValue: 'All Vehicle' },
      { value: 0, viewValue: 'Complete Vehicle' },
      { value: 1, viewValue: 'Shared Vehicle' },
    ];

  vehicleType = -1;
  vehicleTypes =
    [
      { value: -1, viewValue: 'All Vehicle' },
      { value: 0, viewValue: 'Open Vehicle' },
      { value: 1, viewValue: 'Covered Vehicle' },
    ];
  distance = 50;
  priceStart;
  priceEnd;
  constructor(private filterEvent: FilterEvent) { }

  ngOnInit() {
  }
  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  applyFilter() {
    const filters = {
      listing: this.listingType,
      vehicle: this.vehicleType
    };

    sessionStorage.setItem('filters', JSON.stringify(filters));
    this.filterEvent.filterEvent.emit('filters');
  }
}
