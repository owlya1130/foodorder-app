import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodorderPageRoutingModule } from './foodorder-routing.module';

import { FoodorderPage } from './foodorder.page';
import { ModifyOrderQuantityComponent } from './dialogs/modify-order-quantity/modify-order-quantity.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodorderPageRoutingModule
  ],
  declarations: [FoodorderPage, ModifyOrderQuantityComponent]
})
export class FoodorderPageModule {}
