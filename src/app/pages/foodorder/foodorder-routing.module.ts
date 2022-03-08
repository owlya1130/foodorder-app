import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodorderPage } from './foodorder.page';

const routes: Routes = [
  {
    path: '',
    component: FoodorderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodorderPageRoutingModule {}
