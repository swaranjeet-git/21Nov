import { Component, OnInit, Input, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Output,  EventEmitter } from '@angular/core';
// import { RestService } from '../../../../../services/rest.service';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-map-location',
  templateUrl: './mapLocation.component.html',
  styleUrls: ['./mapLocation.component.css']
})
export class MapLocationComponent implements OnInit {

  submitForm: FormGroup;
  public latitude: number;
  public longitude: number;
  public zoom: number;
  @ViewChild("searchMap")
  public searchElementRef: ElementRef;
  @Input('PlaceHolder')
  userPlaceHolder;
  @Input('required')
  required;
  @Output('latlngChange')
  latlngChangeEvent = new EventEmitter();
  locName: string;

  mapCollaps = true;
  googleLocation = new FormControl();
  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
  }

  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    // this.setLatLng(45.8282, -98.5795);

    //create search FormControl
    // this.searchControl = new FormControl();
    //set current position
    this.setCurrentPosition();

  }

  mapChangeCenter(event) {
    // console.log(event);
    this.latitude = event.lat;
    this.longitude = event.lng;
    this.setLatLng(event.lat, event.lng);
  }


  ngAfterViewInit() {

    console.log("ngAfterViewInit");
    // private placesService: google.maps.places.PlacesService,
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();


          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          // console.log("place");
          // console.log(place);

          //set latitude, longitude and zoom
          this.setLatLng(place.geometry.location.lat(), place.geometry.location.lng());
          this.zoom = 15;
        });
      });
    });
  }

  expandMap() {
    return this.mapCollaps = !this.mapCollaps;
  }

  activeNow() {
    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(this.latitude, this.longitude);
    let request = {
      location: latlng
    };
    geocoder.geocode(request, (results, status) => {       //<<<===removed function keyword and added arrowfunction

      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0] != null) {
          // let city = results[0].address_components[results[0].address_components.length - 4].short_name;
          // console.log("address");
          // console.log(results[0].address_components);
          // console.log(results[0]);
          this.locName = '';
          this.latlngChangeEvent.emit({latlng: {lat: this.latitude, lng : this.longitude}, address: results[0].address_components});
          results[0].address_components.filter((v, i) => i<4).forEach(element => {
            this.locName = `${this.locName} ${element.long_name}` 
          });
        } else {
          alert("No address available");
        }
      }
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setLatLng(position.coords.latitude, position.coords.longitude);
        this.zoom = 15;
      });
    }
  }

  setLatLng(lat, lng){
    this.latitude = lat;
    this.longitude = lng;
  }
}

