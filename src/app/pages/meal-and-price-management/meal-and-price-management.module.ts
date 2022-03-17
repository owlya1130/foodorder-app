import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealAndPriceManagementPageRoutingModule } from './meal-and-price-management-routing.module';

import { MealAndPriceManagementPage } from './meal-and-price-management.page';
import { MealSettingComponent } from './dialogs/meal-setting/meal-setting.component';
import { DiscountSettingComponent } from './dialogs/discount-setting/discount-setting.component';


const dlgs = [
  MealSettingComponent,
  DiscountSettingComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MealAndPriceManagementPageRoutingModule
  ],
  declarations: [MealAndPriceManagementPage, ...dlgs]
})
export class MealAndPriceManagementPageModule {}
