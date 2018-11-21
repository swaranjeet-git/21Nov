import { Component, Input } from '@angular/core';

@Component({
    selector: '.bids-for-order',
    templateUrl: './bid.component.html',
    styleUrls: ['./bid.component.css']
})
export class BidsForOrderComponent {

    @Input() bid;
}
