import { SharedModule } from './shared/app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { navigatableConponents, ROUTES } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormWizardModule } from 'angular2-wizard';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { RestService } from './services/rest.service';
import { CookieModule } from 'ngx-cookie';
import { TransporterModule } from './transporter/app.module';
import { HomeHeaderComponent } from './shared/components/header/header.component';
import { ShipperModule } from './shipper/app.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2';
import { MatButtonModule } from '@angular/material/button';


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
    AppComponent,
    HomeHeaderComponent,
    navigatableConponents,
    
  ],
  imports: [
    MatButtonModule,
    TransporterModule,
    ShipperModule,
    SharedModule,

    BrowserModule,
    BrowserAnimationsModule,
    FormWizardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    CookieModule.forRoot()
  ],
  providers: [RestService, AngularFireAuth],
  bootstrap: [AppComponent],
})
export class AppModule { }
