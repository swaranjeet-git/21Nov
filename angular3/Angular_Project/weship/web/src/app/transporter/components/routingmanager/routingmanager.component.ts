import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from '../../../services/rest.service';

@Component({
  selector: 'app-routing-mgr',
  templateUrl: './routingmanager.component.html',
  styleUrls: ['./routingmanager.component.css']
})
export class RoutingManagerComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private _restService: RestService) { }

  ngOnInit() {
    // this._restService.getRequest(`${HostConfig.hostUrl}/user/${userId}`).subscribe(data => {
    // this.vehicleNames = data;
    // let userId = this.route.snapshot.params['id'];
    let userId = 19;
    // this._restService.getRequest(`${HostConfig.hostUrl}/transporter/user/${userId}`).subscribe(data => {
      // if (data) {
        // this.router.navigate(["profile", (<{ id: number }>data).id], { relativeTo: this.route });
        // this.router.navigate([''], { relativeTo: this.route });
    //   } else {
    //     this.router.navigate(["data"], { relativeTo: this.route });
    //   }
    // });
    // });

  }

}
