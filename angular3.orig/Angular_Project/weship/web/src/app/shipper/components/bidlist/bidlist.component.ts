import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../services/rest.service';
import { ActivatedRoute } from '@angular/router';
import { HostConfig } from '../../../services/host-config';

@Component({
    templateUrl : './bidlist.component.html',
    styleUrls : ['./bidlist.component.css'],
    providers : [RestService]
})
export class BidlistComponent implements OnInit {

    orderData;

    constructor(private _restService: RestService, private _acRoutes: ActivatedRoute) { }

    ngOnInit() {

        this._acRoutes.params.subscribe(paramData => {
            console.log('paramData ', paramData);

            this.getOrderData(paramData.orderId);
        });
    }

    getOrderData(orderId) {
        this._restService.getRequest(`${HostConfig.hostUrl}/order/${orderId}`)
                            .subscribe(data => {
                                console.log(data);
                                this.orderData = data;
                            });
    }
}
