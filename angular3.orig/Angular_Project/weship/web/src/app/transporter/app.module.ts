import { HomeComponent } from './components/home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';

import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormWizardModule } from 'angular2-wizard';
import { navigatableConponentsTransportar, TPSROUTES } from './app.routes';
import { HeaderComponent } from './components/header/header.component';
import {
  MatExpansionModule,
  MatRadioModule,
  MatTabsModule,
  MatCardModule,
  MatGridListModule,
  MatDatepickerModule,
  MatMenuModule,
  MatTooltipModule,
  MatNativeDateModule
} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
import 'hammerjs';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from '../services/auth.service';
import { WindowService } from '../services/window.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SentEmail } from '../services/sendemail.service';
import { SharedModule } from '../shared/app.module';
import { DetailedOrderListComponent } from './components/orderList/detailed-order-list/detailed-order-list.component';
import {
  MytransDetailedOrderListComponent
} from './components/myhome/mytransactions/mytrans-detailed-order-list/mytrans-detailed-order-list.component';
/* import { MypageComponent } from './components/mypage/mypage.component'; */
import { PersonalComponent } from './components/profile/personal-details/personal-details.component';
import { FilterEvent } from './components/leftPanel/filter.service';
import { AgmCoreModule } from '@agm/core';
import { RightBannerComponent } from './components/rightPanel/right-banner.component';
import { PersonalDetailsUpdateComponent } from './components/profile/personal-details-update/personal-details-update.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';



export const firebaseConfig = {
  // apiKey: 'AIzaSyC1F0u3pp-2RF7OWw04mmZKMN6Oh1xMdt8',
  // authDomain: 'pezitrweb.firebaseapp.com',
  // databaseURL: 'https://pezitrweb.firebaseio.com',
  // projectId: 'pezitrweb',
  // storageBucket: 'pezitrweb.appspot.com',
  // messagingSenderId: '11778639756'
  apiKey: 'AIzaSyDQxzG-tQnLqNUjEOkJj4hU6NTRYMy-IEc',
  authDomain: 'pezitr-163717.firebaseapp.com',
  databaseURL: 'https://pezitr-163717.firebaseio.com',
  projectId: 'pezitr-163717',
  storageBucket: 'pezitr-163717.appspot.com',
  messagingSenderId: '114863431271'
};

@NgModule({
  declarations: [
    HeaderComponent,
    navigatableConponentsTransportar,
    PersonalComponent,
    DetailedOrderListComponent,
    MytransDetailedOrderListComponent,
    RightBannerComponent,
    PersonalDetailsUpdateComponent,
    EditProfileComponent,
    /* MypageComponent, */
  ],
  imports: [
    SharedModule,
    CdkTableModule,
    MatTableModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    MatDatepickerModule,
    MatMenuModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatIconModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    FormWizardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSnackBarModule,
    MatPaginatorModule,
    RouterModule.forChild(TPSROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC1eWk-2vuh_ueY4A0h0Vm6JEv1qg0VF_s',
      libraries: ['places']
    })
  ],
  providers: [AuthGuard, AuthService, WindowService, SentEmail, FilterEvent],
  exports: []
})
export class TransporterModule { }
