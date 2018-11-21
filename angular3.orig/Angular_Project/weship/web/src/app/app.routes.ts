import { HomeComponent } from './transporter/components/home/home.component';
import { HomesectionComponent } from './shared/components/homesection/homesection.component';
import { Routes } from '@angular/router';
import { JoinsComponent } from './shared/components/joinUs/joinus.component';
import { PhoneLoginComponent } from './shared/components/phoneLogin/phone-login.component';

export const ROUTES: Routes = [
    { path: '', component: HomesectionComponent },
    // { path: 'joinus', component: JoinsComponent },
];

export const navigatableConponents = [
    HomesectionComponent,
    // JoinsComponent,
    // PhoneLoginComponent
];


