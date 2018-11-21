import { FilterEvent } from './../leftPanel/filter.service';
import { Component, OnInit, Input, OnDestroy, AfterViewInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { RestService } from '../../../services/rest.service';
import { LocationUtility } from '../../../services/location-utility';
import { HostConfig } from '../../../services/host-config';
import { PageEvent, MatPaginator, MatTableDataSource } from '@angular/material';
import { MapsAPILoader } from '@agm/core';


import { ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Listing } from '../../../shipper/components/newdeliveries/sharevehicle/sharevehicle.components';

@Component({
  selector: 'app-order-list',
  templateUrl: './orderList.component.html',
  styleUrls: ['./orderList.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy, AfterViewInit {
  // start  MatPaginator Inputs
  // end  MatPaginator Inputs
  /*using for some other purpose*/
  // displayedColumns = ['position', 'name', 'weight', 'symbol'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource;

  /*end using for some other purpose*/
  // pageNo:number;
  listing;
  expandIndex = -1;
  expandCard: boolean[] = new Array<boolean>();
  listingObservable: any;
  pageEvent: PageEvent = new PageEvent();
  cities;
  selectedCity;
  @ViewChild('myCity') myCity;
  filter;
  rcdfilter;
  pageNumber = 0;
  pageSize = 2;
  length; // = 100;
  pageSizeOptions = [5, 10, 25, 100];
  orderCount;
  displayedColumns:any[]=[];

  sortOptions = [
    { id: 'fromDate', value: 'Nearest Start Date' },
    { id: 'toDate', value: 'Nearest End Date' }
  ];
  selecetedSort = 'toDate';

  constructor(private _restService: RestService
    , private filterEvent: FilterEvent
    , private cdr: ChangeDetectorRef
    , private ngZone: NgZone) { }
  locationUtility = new LocationUtility();
  ngOnInit() {
    // this.getLocation();
    this.selectedCity = sessionStorage.getItem('city');
     this.pageNumber = 0;
     this.pageNumber = this.onPaginateChange(this.pageEvent);
     this.loadCity();
    console.log('OrderListComponent initilised');
    //getting ordercount
    //added by kish on 10March
    this.countLoad();
    //end
    
    this.loadData();
    this.listingObservable = this.filterEvent.filterEvent.subscribe(() => {
      this.loadData();
    });
  }

  ngAfterViewInit() {
    if (!this.selectedCity) {
      this.myCity.toggle();
    }
    this.cdr.detectChanges();
  }
  loadCity() {
    this.cities = JSON.parse(sessionStorage.getItem('filters'));
    if (!this.cities) {
      this._restService.getRequest(`${HostConfig.hostUrl}/listing/cities`).subscribe(cityres => {
        this.cities = cityres;
        //added by kish on 10March
        this.countLoad();
        //end
      });
    }
    
  }
  cityChange(event) {
    console.log(event);
    // if (!event) {
    sessionStorage.setItem('city', this.selectedCity);
    this.createFilterStr();
    this._restService.getRequest(`${HostConfig.hostUrl}/listingOrder${this.filter}`).subscribe(res => {
      this.listing = res;
      //added by kish on 10March
      this.countLoad();
      //end
    });
    console.log('city changed');
    // }
  }

  citySelectClosed(event) {
    if (!event) {
      if (!this.selectedCity) {
        this.selectedCity = 'all';
        sessionStorage.setItem('city', this.selectedCity);
        this.loadData();
      }
    }
  }
  sortChange() {
    this.loadData();
  }

  loadData() {
    this.createFilterStr();
    this._restService.getRequest(`${HostConfig.hostUrl}/listingOrder${this.filter}`).subscribe(orderRes => {
      this.listing = orderRes;
      // this.dataSource = new MatTableDataSource<Listing>(this.listing);
      // console.log("cheking dataSource");
      
      // console.log(this.dataSource);
      
      //this.length = 3;
      this.expandCard = new Array<boolean>(this.listing.length);
    });
  }
//added by kish on 10March
  countLoad() {
    this.recdCountFilter();
    this._restService.getRequest(`${HostConfig.hostUrl}/listingOrder/count${this.rcdfilter}`).subscribe(totalRecord => {
      this.orderCount = totalRecord;
      this.length = this.orderCount;
    })
  }
//end
  recdCountFilter() {
    const rcdfilters = JSON.parse(sessionStorage.getItem('filters'));
    let rcdfilterstr = '';
    //added by kish on 10March
    rcdfilterstr += `city=${this.selectedCity}&`;
    //end
     if (rcdfilters) {
      rcdfilterstr += rcdfilters.listing === -1 ? '' : `isShared=${rcdfilters.listing === 1}&`;
      rcdfilterstr += rcdfilters.vehicle === -1 ? '' : `isCovered=${rcdfilters.vehicle === 1}&`;
      console.log(rcdfilterstr);
    }
    this.rcdfilter = rcdfilterstr ? `?${rcdfilterstr}` : '';
  }

  createFilterStr() {
    const filters = JSON.parse(sessionStorage.getItem('filters'));
    let filterstr = '';
    filterstr += `page=${this.pageNumber}&size=${this.pageSize}&sort=${this.selecetedSort},asc&`;
    filterstr += `city=${this.selectedCity}&`;
    if (filters) {
      filterstr += filters.listing === -1 ? '' : `isShared=${filters.listing === 1}&`;
      filterstr += filters.vehicle === -1 ? '' : `isCovered=${filters.vehicle === 1}&`;
      console.log(filterstr);
    }
    this.filter = filterstr ? `?${filterstr}` : '';
  }


  itemSummaryNewLine(summary: string) {
    // summary.replace(',', '\r\n');
    return summary ? summary.replace(', ', ',').replace(/,/gi, '\n').replace(/^,/, '') : summary;
  }

  
  clickCard(index) {
    // console.log(this.expandCard[index]);
    if (this.expandIndex !== -1 && this.expandIndex !== index) {
      this.expandCard[this.expandIndex] = false;
    }
    this.expandIndex = index;
    this.expandCard[index] = !this.expandCard[index];
    // console.log(index);
    // console.log(this.expandCard[index]);
  }
  closeCard(index) {
    console.log("close called");
    console.log(this.expandCard)
    this.expandCard[index] = !this.expandCard[index];
  }
  ngOnDestroy() {
    if (!this.listingObservable.closed) {
      this.listingObservable.unsubscribe();
    }
    // this.filterEvent.filterEvent.unsubscribe();
    sessionStorage.removeItem('filters');
    console.log('OrderListComponent distroyed');
  }

  onPaginateChange(event) {

    // alert(JSON.stringify(`Current page index: ${event.pageIndex}`));
    if (event.pageIndex !== undefined) {
      this.pageNumber = event.pageIndex;
      this.loadData();
    }
    return this.pageNumber;
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude,
          lng = position.coords.longitude,
          latlng = new google.maps.LatLng(lat, lng),
          geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'location': latlng }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results) {
              for (let i = 0; i < results.length; i++) {
                if (results[i].types[0] === 'locality') {
                  const city = results[i].address_components[0].long_name;
                  console.log(city);
                  // this.selectedCity = city;
                  this.ngZone.run(() => {
                    this.selectedCity = city;
                  });
                  break;
                  // $(`input[name='location']`).val(city + ', ' + state);
                }
              }
            } else {
              this.myCity.open();
              console.log('No reverse geocode results.');
            }
          } else {
            this.myCity.open();
            console.log('Geocoder failed: ' + status);
          }
        });
      },
        () => {
          this.myCity.open();
          console.log('Geolocation not available.');
        }
        , {
          enableHighAccuracy: true
        }
      );
    }
  }

}
