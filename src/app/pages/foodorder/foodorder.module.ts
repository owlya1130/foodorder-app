import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodorderPageRoutingModule } from './foodorder-routing.module';

import { FoodorderPage } from './foodorder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodorderPageRoutingModule
  ],
  declarations: [FoodorderPage]
})
export class FoodorderPageModule {}
