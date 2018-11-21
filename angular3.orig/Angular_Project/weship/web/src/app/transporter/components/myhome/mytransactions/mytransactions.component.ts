import { HostConfig } from './../../../../services/host-config';
import { Component, OnInit } from '@angular/core';
import { RestService } from './../../../../services/rest.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocationUtility } from './../../../../services/location-utility';
import { CookieService } from 'ngx-cookie';
import { TransporterTxn } from '../../../../shared/modal/transportertxn';

@Component({
  selector: 'app-mytransactions',
  templateUrl: './mytransactions.component.html',
  styleUrls: ['./mytransactions.component.css']
})
export class MyTransactionsComponent implements OnInit {
  bidInitLists;
  bidAcceptLists;//:TransporterTxn[]=new Array<TransporterTxn>();
  bidCompletedLists;
  completeLists;
  inProgLists;
  assignLists;
  orderDetails;
  locationUtility: LocationUtility;
  expandCard: boolean[] = new Array<boolean>();
  title;
  name;
  brand;
  rtoNumber;
  loggedIn;
  cookieService;
  arrayTxnInitListIds: Number[] = new Array<Number>();
  arrayTxnAcceptListIds: Number[] = new Array<Number>();
  arrayTxnCompletedListIds: Number[] = new Array<Number>();
  bidLists;
  intiateTxnList;
  acceptShipTxnList;
  completedShipTxnList;
  expandIndex = -1;
  initiateTxnNoData=false;
  acceptTxnNoData=false;
  completedTxnNoData=false;
  
  //detailFurMapper :DetailFurMapper = new DetailFurMapper();
  constructor(private _restService: RestService, private _cookieService: CookieService) { }
  ngOnInit() {
    this.loggedIn = this._cookieService.get('ut');

    this.locationUtility = new LocationUtility();
    this._restService.getRequest(`${HostConfig.hostUrl}/transportertxn/bid/${this.loggedIn}?status=initiated`).subscribe(res => {

      this.bidInitLists = res;
      if(this.bidInitLists.length===0){
        this.initiateTxnNoData=true;
      }
      console.log(this.bidInitLists);
        this.bidInitLists.forEach(element => {
          let ids: Number;
          ids = <Number>element.listingId;
          this.arrayTxnInitListIds.push(ids);

        });
        if(this.bidInitLists.length!==0){
          // this._restService.getRequest('${HostConfig.hostUrl}/listing/txnList/${this.arrayTxnInitListIds}?status=published').subscribe(res => {
            this._restService.getRequest(`${HostConfig.hostUrl}/listing/txnList/${this.arrayTxnInitListIds}?status=published`).subscribe(res => {
          this.intiateTxnList = res;
        })
        }

     })
      
      //this._restService.getRequest("${HostConfig.hostUrl}/transportertxn/bid/" + this.loggedIn + '?status=accepted').subscribe(res => {
        this._restService.getRequest(`${HostConfig.hostUrl}/transportertxn/bid/${this.loggedIn}?status=accepted`).subscribe(res => {

      this.bidAcceptLists = res;
      console.log(this.bidAcceptLists);
      if(this.bidAcceptLists.length===0){
        this.acceptTxnNoData=true;
      }
      
        this.bidAcceptLists.forEach(element => {
          let ids: Number;
          ids = <Number>element.listingId;
          this.arrayTxnAcceptListIds.push(ids);

        });

        if(this.bidAcceptLists.length!==0){
        //this._restService.getRequest("${HostConfig.hostUrl}/listing/txnList/" + this.arrayTxnAcceptListIds+"?status=assigned").subscribe(res => {
          this._restService.getRequest(`${HostConfig.hostUrl}/listing/txnList/${this.arrayTxnAcceptListIds}?status=assigned`).subscribe(res => {
          this.acceptShipTxnList = res;
          console.log(this.acceptShipTxnList);
        })
      }
      })

      //this._restService.getRequest("${HostConfig.hostUrl}/transportertxn/bid/" + this.loggedIn + '?status=accepted').subscribe(res => {
        this._restService.getRequest(`${HostConfig.hostUrl}/transportertxn/bid/${this.loggedIn}?status=completed`).subscribe(res => {

          this.bidCompletedLists = res;
          console.log(this.bidCompletedLists);
          if(this.bidCompletedLists.length===0){
            this.completedTxnNoData=true;
          }
          
            this.bidCompletedLists.forEach(element => {
              let ids: Number;
              ids = <Number>element.listingId;
              this.arrayTxnCompletedListIds.push(ids);
    
            });
    
            if(this.bidCompletedLists.length!==0){
            //this._restService.getRequest("${HostConfig.hostUrl}/listing/txnList/" + this.arrayTxnAcceptListIds+"?status=assigned").subscribe(res => {
              this._restService.getRequest(`${HostConfig.hostUrl}/listing/txnList/${this.arrayTxnCompletedListIds}?status=completed`).subscribe(res => {
              this.completedShipTxnList = res;
             })
          }
          })
    
  }

  itemSummaryNewLine(summary: string) {
     summary.replace(",", "\r\n");
    return summary? summary.replace(", ", ",").replace(/,/gi, "\n").replace(/^,/, ""):summary;
  }

  
  // orderDetail(id:number){
  //   this._restService.getRequest("HostConfig.hostUrl/listItem/itemList/" + id).subscribe(res => {
  //   this.orderDetails=res;
  //   console.log(this.orderDetails);
    
  // });
  // }

  clickCard(index) {
    console.log(index);
    console.log(this.expandIndex);
    console.log(this.expandCard[index]);
    if (this.expandIndex !== -1 && this.expandIndex !== index) {
      this.expandCard[this.expandIndex] = false;
    }
    this.expandIndex = index;
    this.expandCard[index] = !this.expandCard[index];
    console.log(this.expandCard[index]);
    

  }
  /*below mehtod added by kish */
  closeCard(index) {
    console.log("close called");
    console.log(this.expandCard)
    this.expandCard[index] = !this.expandCard[index];
    console.log(this.expandCard);
  }
  /* end below mehtod added by kish */
}

