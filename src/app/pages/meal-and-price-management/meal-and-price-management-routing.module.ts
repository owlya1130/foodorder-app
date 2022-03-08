import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealAndPriceManagementPage } from './meal-and-price-management.page';

const routes: Routes = [
  {
    path: '',
    component: MealAndPriceManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealAndPriceManagementPageRoutingModule {}
