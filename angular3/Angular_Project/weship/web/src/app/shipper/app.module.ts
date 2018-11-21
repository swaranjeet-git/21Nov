import { AuthGuard } from './auth-guard.service';

import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { navigatableConponentsShipper, SHPRROUTES } from './app.routes';

import { OrderdetailComponent } from './components/sharedComponents/orderDetailComponent/orderdetail.component';
import { BidsForOrderComponent } from './components/sharedComponents/bidComponent/bid.component';
import {ViewTransporterListComponent} from './components/view-transporter-list/view-transporter-list.component';
import { ShipperMaterialModule } from './shipper.material.module';

import { MatExpansionModule, MatNativeDateModule, MatProgressSpinnerModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import 'hammerjs';
import {MatTabsModule} from '@angular/material/tabs';
import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { ListingDeleteDialogComponent, ListingEditDialogComponent } from './components/home/home.component';
import { LoginEvent } from '../services/login-event';
import { SharedModule } from '../shared/app.module';
import { ImageUploadModule } from "angular2-image-upload";

import { Ng2FileInputModule } from 'ng2-file-input';
import { Ng2ImgToolsService, Ng2ImgToolsModule } from 'ng2-img-tools';


@NgModule({
  declarations: [
    navigatableConponentsShipper,
    OrderdetailComponent,
    BidsForOrderComponent,
    ListingDeleteDialogComponent,
    ListingEditDialogComponent,
    ViewTransporterListComponent
  ],
  imports: [
    Ng2ImgToolsModule,
    Ng2FileInputModule.forRoot(),
    SharedModule,
    MatTabsModule,
    MatExpansionModule,
    MatIconModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    MatDatepickerModule,
    MatMenuModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(SHPRROUTES),
    ShipperMaterialModule,
    MatRadioModule,
    ImageUploadModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC1eWk-2vuh_ueY4A0h0Vm6JEv1qg0VF_s',
      libraries: ['places']
    })

  ],
  providers: [LoginEvent,
    AuthGuard
    // Ng2ImgToolsService
  ],
  exports: [],
  entryComponents: [
    ListingDeleteDialogComponent,
    ListingEditDialogComponent
]
})
export class ShipperModule { }
