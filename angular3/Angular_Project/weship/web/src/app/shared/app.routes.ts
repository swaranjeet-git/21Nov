import { HomesectionComponent } from './components/homesection/homesection.component';
import { Routes } from '@angular/router';
import { JoinsComponent } from './components/joinUs/joinus.component';
import { PhoneLoginComponent } from './components/phoneLogin/phone-login.component';
import { ImageuploadtestComponent } from './components/imgUploadTest/imguploadtest.component';
import { MapLocationComponent } from './components/mapLocation/mapLocation.component';

export const ROUTES: Routes = [
    { path: '', component: HomesectionComponent },

    // {
    //     // path: 'transporter', component: TprHomesectionComponent, children: TPSROUTES
    // }
];

export const navigatableConponents = [
    // HomesectionComponent,
    // navigatableConponentsTps
    JoinsComponent,
    PhoneLoginComponent,
    ImageuploadtestComponent,
    MapLocationComponent
];
export const exportConponents = [
    JoinsComponent,
    PhoneLoginComponent,
    ImageuploadtestComponent,
    MapLocationComponent
];
