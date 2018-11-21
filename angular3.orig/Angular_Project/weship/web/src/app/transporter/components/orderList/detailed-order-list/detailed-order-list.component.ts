import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RestService } from '../../../../services/rest.service';
import { LocationUtility } from '../../../../services/location-utility';
import { ListItem } from '../../../../shared/modal/listItem';
import { User } from '../../../../shared/modal/user';
import { Bid } from '../../../../shared/modal/bid';
import { TransporterTxn } from '../../../../shared/modal/transportertxn';
import { VehicleMaster } from '../../../../shared/modal/vehicleModal';
import { CookieService } from 'ngx-cookie';
import { LoginEvent } from '../../../../services/login-event';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HostConfig } from '../../../../services/host-config';


@Component({
  selector: 'app-detailed-order-list',
  templateUrl: './detailed-order-list.component.html',
  styleUrls: ['./detailed-order-list.component.css']
})
export class DetailedOrderListComponent implements OnInit {
  shipperUser: User = new User();
  transUser: User = new User();
  locationUtility: LocationUtility = new LocationUtility();
  transporterTxn; // :TransporterTxn = new TransporterTxn();
  bid: Bid;
  vehicle: VehicleMaster = new VehicleMaster();
  itemList; // :ListItem = new ListItem();
  itemListArray = [];
  loggedIn;
  bidAmtEnable = false;
  itemDetailForm: FormGroup;
  progressSpinner = false;
  errorMsg: string;
  bidCount: number;
  imageUrl: string;
  itemimageUrl: string;
  bidMessage = false;
  successMsg = false;
  @Input()
  inputItem;
  @Output()
  closed = new EventEmitter();
  constructor(private restService: RestService
    , private cookieService: CookieService
    , private loginEvent: LoginEvent
    , private activatedRoute: ActivatedRoute
  ) { }



  ngOnInit() {
    console.log("==>>>>>> "+this.inputItem);
    
    this.imageUrl = '/assets/images/no-image-round.png';
    this.loggedIn = this.cookieService.get('ut');
    if (this.inputItem.bidCount === undefined || this.inputItem.bidCount === 0) {
      this.inputItem.bidCount = 1;
    } else {
      this.inputItem.bidCount = this.inputItem.bidCount + 1;
    }
    if (!this.inputItem.shared && (this.inputItem.vehicleId !== null || this.inputItem.vehicleId !== undefined)) {
      this.restService.getRequest(`${HostConfig.hostUrl}/vehicleMaster/vehicle/` + this.inputItem.vehicleId).subscribe(res => {
        this.vehicle = <VehicleMaster>res;
        // this.imageUrl = `/assets/images/${this.vehicle.imageUrl}`;
        this.imageUrl = this.vehicle.imageUrl ? this.vehicle.imageUrl : '/assets/images/no-image-round.png';
      });
    }

    this.restService.getRequest(`${HostConfig.hostUrl}/listItem/itemList/${this.inputItem.id}`).subscribe(res => {
      this.itemList = res;
      this.itemList.forEach(orderDetail => {
        orderDetail.detail = JSON.parse(orderDetail.detail);
      });
    });

    this.restService.getRequest(`${HostConfig.hostUrl}/user/${this.inputItem.userId}`).subscribe(res => {
      this.shipperUser = <User>res;
      // console.log(this.shipperUser);
    });

    this.restService.getRequest(`${HostConfig.hostUrl}/transportertxn/bid/${this.loggedIn}?status=initiated`).subscribe(res => {
      this.transporterTxn = res;

    });

    this.itemDetailForm = new FormGroup({
      'bidAmt': new FormControl(null),
      // 'comment':new FormControl(null),
    });

  }

  logToBid() {
    this.loginEvent.canActivateEvent.emit();
  }
  enableBidAmt() {
    this.bidAmtEnable = true;
    if (this.transporterTxn !== null) {
      this.transporterTxn.forEach(element => {
        if (element.listingId === this.inputItem.id) {
          this.bidAmtEnable = false;
          return this.bidMessage = true;
        }
      });
    }

  }

  addBid() {

    if (this.loggedIn !== null && this.loggedIn !== undefined) {
      this.restService.getRequest(`${HostConfig.hostUrl}/user/${this.loggedIn}`).subscribe(userres => {

        this.transUser = <User>userres;
        console.log(this.transUser);
        this.restService.postRequest(`${HostConfig.hostUrl}/bid`, this.convertData()).subscribe(bidres => {
          this.bid = <Bid>bidres;
          this.restService.postRequest(`${HostConfig.hostUrl}/transportertxn`, this.convertDataTranTx()).subscribe(txnres => {
            this.transporterTxn = txnres;
            console.log(this.transporterTxn);

            this.restService.putRequest(`${HostConfig.hostUrl}/listing/${this.inputItem.id}`, this.addbidCount()).subscribe(listres => {

            });
          });

          setTimeout(() => {
            this.progressSpinner = false;
            this.successMsg = true;
          }, 2000);
        });

      },
        (error) => {
          this.errorMsg = 'Bid Not Add Successfully';
          console.log(error, 'Bid Not Add Successfully');
        });
    }
  }

  convertData() {
    return JSON.stringify({
      'shipperId': this.shipperUser.id,
      'amount': this.itemDetailForm.get('bidAmt').value,
      'listId': this.inputItem.id,
      'transId': this.transUser.id,
      'transFName': this.transUser.fName,
      'transLName': this.transUser.lName,
      'transMobile': this.transUser.mobile,
      'transEmail': this.transUser.email,
    });
  }

  convertDataTranTx() {
    return JSON.stringify({
      'bid': this.bid,
      'status': 'initiated'
    });
  }

  addbidCount() {
    return JSON.stringify({
      'bidCount': this.inputItem.bidCount
    });
  }

  closeCard() {
    this.closed.emit();
  }
}
