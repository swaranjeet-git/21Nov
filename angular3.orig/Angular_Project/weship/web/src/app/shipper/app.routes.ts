import { AuthGuard } from './auth-guard.service';
import { BidlistComponent } from './components/bidlist/bidlist.component';
import { OrderBidlistComponent } from './components/home/orderbidlist/orderbidlist.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { NewDeliveryComponent } from './components/newdeliveries/newdeliveries.components';
import { RoutingManagerComponent } from './components/routingmanager/routingmanager.component';
import { VehicleTypeComponent } from './components/newdeliveries/vehicle-type/vehicle-type.component';
import { HireVehicleComponent } from './components/newdeliveries/hirevehicle/hirevehicle.components';
import { ShareVehicleComponent } from './components/newdeliveries/sharevehicle/sharevehicle.components';
import { VehicleFormComponent } from './components/newdeliveries/sharevehicle/vehicleform/vehicleform.component';
import { FurnitureFormComponent } from './components/newdeliveries/sharevehicle/furnitureform/furnitureform.component';
import { AppliancesFormComponent } from './components/newdeliveries/sharevehicle/appliancesform/appliancesform.component';
import { CategorySelectorformComponent } from './components/newdeliveries/sharevehicle/categorySelectorform/categorySelectorform.component';
import { SubmitFormComponent } from './components/newdeliveries/sharevehicle/submitform/submitform.component';
import { JoinsComponent } from '../shared/components/joinUs/joinus.component';
import { HireVehicleEditComponent } from './components/newdeliveries/hirevehicle/hirevehicleEdit/hirevehicleEdit.component';
import { AnimalFormComponent } from './components/newdeliveries/sharevehicle/animal/animalform.component';
import { HouseholdFormComponent } from './components/newdeliveries/sharevehicle/household/householdform.component';
import { OthersFormComponent } from './components/newdeliveries/sharevehicle/others/othersform.component';
import {ViewTransporterListComponent} from './components/view-transporter-list/view-transporter-list.component'
// import { ImageuploadtestComponent } from './components/imgUploadTest/imguploadtest.component';

export const SHPRROUTES: Routes = [
    {
        path: 'shipper', component: RoutingManagerComponent, children: [
            { path: '', component: HomeComponent },
            // { path: 'imguploadtest', component: ImageuploadtestComponent },
            {  path: 'view', component: ViewTransporterListComponent},
               { path: 'newship', component: NewDeliveryComponent, children: [
                 { path: '', component: VehicleTypeComponent },
                // { path: '', component: ViewTransporterComponent },
                { path: 'hirevehicle', component: HireVehicleComponent,  canActivate: [AuthGuard] },
                { path: 'hirevehicle/:id', component: HireVehicleEditComponent},
                { path: 'sharevehicle', component: ShareVehicleComponent,  canActivate: [AuthGuard] },
            ]},
            { path: 'bidlist/:orderId', component: BidlistComponent },
            { path: 'joinus', component: JoinsComponent }
        ]

    }

];

export const navigatableConponentsShipper = [
    RoutingManagerComponent,
    HomeComponent,
    HeaderComponent,
    NewDeliveryComponent,
    VehicleTypeComponent,
    HireVehicleComponent,
    HireVehicleEditComponent,
    ShareVehicleComponent,
    OrderBidlistComponent,
    BidlistComponent,
    CategorySelectorformComponent,
    VehicleFormComponent,
    FurnitureFormComponent,
    AnimalFormComponent,
    HouseholdFormComponent,
    OthersFormComponent,
    AppliancesFormComponent,
    SubmitFormComponent,
    
    // ImageuploadtestComponent,
];
