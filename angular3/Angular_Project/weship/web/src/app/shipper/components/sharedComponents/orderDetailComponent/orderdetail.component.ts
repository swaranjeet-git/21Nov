import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-shp-order-detail',
    templateUrl: './orderdetail.component.html'
})
export class OrderdetailComponent {

    @Input() orderData;

}
