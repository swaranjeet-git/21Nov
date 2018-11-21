import { Component, OnInit, Inject } from '@angular/core';
import { RestService } from '../../../services/rest.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { LocationUtility } from '../../../services/location-utility';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { HostConfig } from '../../../services/host-config';
import { LoginEvent } from '../../../services/login-event';

@Component({
  selector: 'app-shipper-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private _restService: RestService,
    public dialog: MatDialog,
    private _cookieService: CookieService,
    private loginEvent: LoginEvent) { }
  draftlisting;
  tabs = ['draft', 'published', 'assigned', 'shipped', 'cancelled'];
  selectedTab = 'published';
  loggedInUser;
  locationUtility = new  LocationUtility();
  pageIndex;
  expandIndex = -1;
  expandCard: boolean[] = new Array<boolean>();

  ngOnInit() {
    this.loggedInUser = this._cookieService.get('ut');
    let statusPage = sessionStorage.getItem('shipprPageType');
    this.expandCard = new Array<boolean>(5);
    if (statusPage) {
      this.selectedTab = statusPage;
    }
       statusPage = this.route.snapshot.queryParams['page'];
    if(statusPage)
    {
      this.selectedTab = statusPage;
    }
    this.pageIndex = this.tabs.indexOf(this.selectedTab);
    console.log(`this.selectedTab ${this.selectedTab}`);
    this.loadData();
  }
  tabChange(tabType) {
    sessionStorage.setItem('shipprPageType', tabType);
    console.log(tabType);
    this.selectedTab = this.tabs[tabType.index];
    sessionStorage.setItem('shipprPageType', this.selectedTab);
    this.loadData();
    console.log(this.selectedTab);

  }


  loadData() {
    this.loggedInUser = this._cookieService.get('ut');
    this._restService.getRequest(`${HostConfig.hostUrl}/listing/user/${this.loggedInUser}?status=${this.selectedTab}`).subscribe(res => {
      this.draftlisting = res;
      console.log(this.draftlisting);
    });
  }
  itemSummaryNewLine(summary: string) {
    // summary.replace(',', '\r\n');
    return summary ? summary.replace(', ', ',').replace(/,/gi, '\n').replace(/^,/, '') : '';
  }

  changeStatus(id, newStatus) {
    alert(newStatus);
    this._restService.putRequest(`${HostConfig.hostUrl}/listing/${id}`, `{"status": "${newStatus}" }`).subscribe(res => {
      this.loadData();
    });
  }

  openDeleteDialog(id): void {
    const dialogRef = this.dialog.open(ListingDeleteDialogComponent, {
      width: '250px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._restService.putRequest(`${HostConfig.hostUrl}/listing/${id}`, `{'status': 'cancelled' }`).subscribe(res => {
          this.loadData();
        });
      }

    });
  }

  openEditDialog(id): void {
    const dialogRef = this.dialog.open(ListingEditDialogComponent, {
      width: '250px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
              this.router.navigate(['newship', 'hirevehicle', id], { relativeTo: this.route});

        // this._restService.putRequest(`${HostConfig.hostUrl}/listing/${id}`, `{'status': 'draft' }`).subscribe(res => {
        //   this.initData()
        // });
      }

    });
  }

  clickCard(index) {
    console.log(this.expandCard[index]);
    if (this.expandIndex !== -1 && this.expandIndex !== index) {
      this.expandCard[this.expandIndex] = false;
    }
    this.expandIndex = index;
    this.expandCard[index] = !this.expandCard[index];
    console.log(this.expandCard[index]);
  }


  login() {
    this.loginEvent.canActivateEvent.emit();
  }
}



@Component({
  selector: 'app-listing-delete-dialog',
  templateUrl: 'listing-delete-dialog.html',
})
export class ListingDeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ListingDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}

@Component({
  selector: 'app-listing-edit-dialog',
  templateUrl: 'listing-edit-dialog.html',
  styleUrls: ['./home.component.css']
})
export class ListingEditDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ListingEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}
