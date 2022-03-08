import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealAndPriceManagementPageRoutingModule } from './meal-and-price-management-routing.module';

import { MealAndPriceManagementPage } from './meal-and-price-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealAndPriceManagementPageRoutingModule
  ],
  declarations: [MealAndPriceManagementPage]
})
export class MealAndPriceManagementPageModule {}
