import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatCardModule, MatAutocompleteModule} from '@angular/material';

@NgModule({
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatAutocompleteModule],
})
export class ShipperMaterialModule { }
