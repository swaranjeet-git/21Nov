import { HostConfig } from './../../../../services/host-config';
import { Component, OnInit,Input } from '@angular/core';
import { RestService } from '../../../../services/rest.service';
import { ActivatedRoute } from '@angular/router';
import { TransporterTxn } from '../../../../shared/modal/transportertxn';


@Component({
    selector: 'app-orderbid-list',
    templateUrl : './orderbidlist.component.html',
    styleUrls : ['./orderbidlist.component.css'],
    providers : [RestService]
})
export class OrderBidlistComponent implements OnInit {

    @Input()
    inputItem;

    successMsg;
    bidAccepted:boolean=false;
    resBidAssign;
    resBidAccept;
    transporterTxnData;
    noBidFound:string;
    transporterTxn :TransporterTxn = new TransporterTxn();
    constructor(private _restService: RestService, private _acRoutes: ActivatedRoute) { }

    ngOnInit() {
        if(this.inputItem.id!==null){
            //this.transporterTxn =  this.getOrderBidList(this.inputItem.id);
            this._restService.getRequest(`${HostConfig.hostUrl}/transportertxn/bidlist/${this.inputItem.id}?status=initiated`).subscribe(res=>{
             this.transporterTxnData=res;
            })
        }     
    }

      bidAccept(transTxnId:number){

        this.bidAccepted = true;

        this._restService.putRequest(`${HostConfig.hostUrl}/listing/${this.inputItem.id}`, this.listingConvertdata()).subscribe(res => {
        this.resBidAssign = res;
            if(this.resBidAssign.status === 'assigned') {
               this._restService.putRequest(`${HostConfig.hostUrl}/transportertxn/${transTxnId}`, 
                this.transTxnconvertdata()).subscribe(response => {
                this.resBidAccept = response;

               });
            }
            setTimeout(() => {
                this.successMsg = true;
              }, 2000);

         });
    }

    listingConvertdata(){
        return JSON.stringify({
            'status':"assigned",
        })
    }
    transTxnconvertdata(){
        return JSON.stringify({
            'status':"accepted",
        })
    }

    
}
