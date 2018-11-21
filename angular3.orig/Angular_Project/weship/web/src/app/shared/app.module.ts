import { ROUTES, exportConponents } from './app.routes';
import { navigatableConponents } from './app.routes';
import { SignUpComponent } from './components/sign-up/sign-up/sign-up.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';

import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormWizardModule } from 'angular2-wizard';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule, MatExpansionModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { AgmCoreModule } from '@agm/core';

import { Ng2FileInputModule } from 'ng2-file-input';
import { Ng2ImgToolsService, Ng2ImgToolsModule } from 'ng2-img-tools';



export const firebaseConfig = {
  // apiKey: "AIzaSyC1F0u3pp-2RF7OWw04mmZKMN6Oh1xMdt8",
  // authDomain: "pezitrweb.firebaseapp.com",
  // databaseURL: "https://pezitrweb.firebaseio.com",
  // projectId: "pezitrweb",
  // storageBucket: "pezitrweb.appspot.com",
  // messagingSenderId: "11778639756"
  apiKey: "AIzaSyDQxzG-tQnLqNUjEOkJj4hU6NTRYMy-IEc",
  authDomain: "pezitr-163717.firebaseapp.com",
  databaseURL: "https://pezitr-163717.firebaseio.com",
  projectId: "pezitr-163717",
  storageBucket: "pezitr-163717.appspot.com",
  messagingSenderId: "114863431271"
};


@NgModule({
  declarations: [
    FooterComponent,
    SignUpComponent,
    navigatableConponents,
  ],
  imports: [
    Ng2ImgToolsModule,
    Ng2FileInputModule.forRoot(),
    BrowserModule,
    FormWizardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AgmCoreModule,

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
    MatExpansionModule

  ],
  providers: [],
  exports: [FooterComponent,
    exportConponents]
})
export class SharedModule { }
