import { Component, OnInit,EventEmitter, Input, Output } from '@angular/core';
import { RestService } from '../../../../../services/rest.service';
import { LocationUtility } from '../../../../../services/location-utility';
import { ListItem } from '../../../../../shared/modal/listItem';
import { User } from '../../../../../shared/modal/user';
import { Bid } from '../../../../../shared/modal/bid';
import {TransporterTxn} from '../../../../../shared/modal/transportertxn';
import {VehicleMaster} from '../../../../../shared/modal/vehicleModal';
import { CookieService } from 'ngx-cookie';
import { LoginEvent } from '../../../../../services/login-event';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HostConfig } from '../../../../../services/host-config';


@Component({
  selector: 'app-mytrans-detailed-order-list',
  templateUrl: './mytrans-detailed-order-list.component.html',
  styleUrls: ['./mytrans-detailed-order-list.component.css']
})
export class MytransDetailedOrderListComponent implements OnInit {
  shipperUser: User = new User();
  transUser: User = new User();
  locationUtility:LocationUtility = new LocationUtility();
  transporterTxn:TransporterTxn = new TransporterTxn();
  bid:Bid;
  vehicle:VehicleMaster= new VehicleMaster();
  itemList;//:ListItem = new ListItem();
  itemListArray = [];
  loggedIn;
  bidAmtEnable = false;
  itemDetailForm: FormGroup;
  progressSpinner = false;
  errorMsg: string;
  bidCount:number;
  imageUrl:string;
  itemimageUrl:string;
  bidMessage=false;
  successMsg=false;
  editBidAmt;
  bidEditRes:Bid = new Bid();
  
  constructor(private restService: RestService, private cookieService: CookieService, private loginEvent: LoginEvent, private activatedRoute: ActivatedRoute) { }

  @Input()
  inputItem;
  @Output()
  closed = new EventEmitter();
  ngOnInit() {
    this.loggedIn = this.cookieService.get('ut');
    
    this.itemimageUrl="/assets/images/noimage.jpg";

    if(this.inputItem.bidCount===undefined || this.inputItem.bidCount===0){
      this.inputItem.bidCount = 1;
    }else{
      this.inputItem.bidCount = this.inputItem.bidCount + 1;
    }
    if(!this.inputItem.shared && (this.inputItem.vehicleId!==null || this.inputItem.vehicleId!==undefined) ){
      this.restService.getRequest(`${HostConfig.hostUrl}/vehicleMaster/vehicle/` + this.inputItem.vehicleId).subscribe(res => {
        this.vehicle =<VehicleMaster> res;
        this.imageUrl="/assets/images/"+this.vehicle.imageUrl;
      });
    }

    this.restService.getRequest(`${HostConfig.hostUrl}/listItem/itemList/${this.inputItem.id}`).subscribe(res => {
      this.itemList = res;
      this.itemList.forEach(orderDetail => {
        orderDetail.detail = JSON.parse(orderDetail.detail);
      });
    })

    this.restService.getRequest(`${HostConfig.hostUrl}/user/${this.inputItem.userId}`).subscribe(res => {
      this.shipperUser = <User>res;
      console.log(this.shipperUser);
    })

    this.restService.getRequest(`${HostConfig.hostUrl}/transportertxn/userbid/${this.inputItem.id}
    ?user=${this.loggedIn}`).subscribe(res => {
       
    this.transporterTxn = <TransporterTxn>res;
      this.editBidAmt=this.transporterTxn.bid.amount;
    },
  error=>{
    console.log("No data found");
    
  })
            
  
        
    

    this.itemDetailForm = new FormGroup({
      'bidAmt': new FormControl({value:'',disabled:true}),
      // 'comment':new FormControl(null),
    })

  }

  // logToBid() {
  //   this.loginEvent.canActivateEvent.emit();
  // }
  // enableBidAmt() {
  //   this.bidAmtEnable = true;
  //   if(this.transporterTxn!==null){
  //     this.transporterTxn.forEach(element => {
  //       if(element.listingId===this.inputItem.id){
  //          this.bidAmtEnable = false;
  //           return this.bidMessage = true;
  //         }} );
  //   }
    
  // }

  editEnable(bName:string){
    
    if(bName==='edit'){
      this.bidAmtEnable=true;
      this.itemDetailForm.controls['bidAmt'].enable();
      this.successMsg=false;
    }
    if(bName==='cancel'){
      this.bidAmtEnable=false;
      this.itemDetailForm.controls['bidAmt'].disable();
    }
  }

  editBid() {

    
    if (this.loggedIn !== null && this.loggedIn !== undefined) {
      //this.restService.putRequest("HostConfig.hostUrl/bid/" + this.transporterTxn.bid.id,this.convertData()).subscribe(res => {
        this.restService.putRequest(`${HostConfig.hostUrl}/bid/${this.transporterTxn.bid.id}`,this.convertData()).subscribe(res => {
        this.bidEditRes = <Bid>res;
             setTimeout(() => {
              //  this.itemDetailForm.controls['bidAmt'].patchValue({

              //  })
                
               
            this.editBidAmt=this.bidEditRes.amount
            this.successMsg=true;
            this.bidAmtEnable=false;
            this.itemDetailForm.controls['bidAmt'].disable();
          }, 2000)
        
        
      },
        (error) => {
          this.successMsg=false;
          this.errorMsg = 'OOps! Bid edit failed';
          console.log(error, 'OOps! Bid edit failed');
        })
    }
  }
  
  convertData() {
    return JSON.stringify({
      // 'shipperId': this.shipperUser.id,
      'amount': this.itemDetailForm.get('bidAmt').value,
      // 'listId': this.inputItem.id,
      // 'transId': this.transUser.id,
      // 'transFName': this.transUser.fName,
      // 'transLName': this.transUser.lName,
      // 'transMobile': this.transUser.mobile,
      // 'transEmail': this.transUser.email,
    })
  }

  // convertDataTranTx(){
  //      return JSON.stringify({
  //     'bid' :this.bid,
  //     'status':'initiated'
  //   })
  // }

  // editBidConverter(){
  //   return JSON.stringify({
  //     'bidCount':this.inputItem.bidCount
  //   })
  // }

/* below method added by kish*/
  closeCard() {
    this.closed.emit();
  }
 /* end below method added by kish*/
}
