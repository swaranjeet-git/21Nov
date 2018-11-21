import { Routes } from '@angular/router';
import { TransporterDataComponent } from './components/myhome/transporter-data/transporter-data.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/myhome/profile/profile.component';
import { PersonalDetailsUpdateComponent } from './components/profile/personal-details-update/personal-details-update.component';
import { OrderListComponent } from './components/orderList/orderList.component';
import { RoutingManagerComponent } from './components/routingmanager/routingmanager.component';
import { LeftPanelComponent } from './components/leftPanel/leftPanel.component';
import { RightPanelComponent } from './components/rightPanel/rightPanel.component';
import { MyhomeComponent } from './components/myhome/myhome.component';
import { MyTransactionsComponent } from './components/myhome/mytransactions/mytransactions.component';
import { AuthGuard } from './auth-guard.service';
import { JoinsComponent } from '../shared/components/joinUs/joinus.component';
import {DetailedOrderListComponent} from './components/orderList/detailed-order-list/detailed-order-list.component';
import { AddVehicleComponent } from './components/addvehicle/addvehicle.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
// import { DialogComponent } from './components/dialog/dialog.component';
// export const TPSROUTES: Routes = [
//     { path: '', component: TransporterDataComponent }
// ];
export const TPSROUTES: Routes = [
    {
        path: 'transporter', component: RoutingManagerComponent,
        children: [
            // { path: ':id', component: ProfileComponent },
            { path: '', component: HomeComponent },
            { path: 'addvehicle', component: AddVehicleComponent },
            // { path: 'dialog', component: DialogComponent },
            { path: 'itemdetail', component: DetailedOrderListComponent },
            { path: 'data', component: TransporterDataComponent },
            { path: 'tranasactions', canActivate: [AuthGuard], component: MyTransactionsComponent },
            //{ path: 'myData', component: ProfileComponent, canActivate: [AuthGuard] },
            { path: 'myData', component: PersonalDetailsUpdateComponent },
            { path: 'joinus', component: JoinsComponent },
            { path: 'edit' , component: EditProfileComponent}

            
        ],
    }
];

export const navigatableConponentsTransportar = [
    HomeComponent,
    TransporterDataComponent,
    ProfileComponent,
    OrderListComponent,
    LeftPanelComponent,
    RightPanelComponent,
    RoutingManagerComponent,
    MyhomeComponent,
    MyTransactionsComponent,
    AddVehicleComponent,
    PersonalDetailsUpdateComponent,
    EditProfileComponent
    //DialogComponent
];
