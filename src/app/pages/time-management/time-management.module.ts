import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimeManagementPageRoutingModule } from './time-management-routing.module';

import { TimeManagementPage } from './time-management.page';
import { ShowOrderComponent } from './dialogs/show-order/show-order.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeManagementPageRoutingModule
  ],
  declarations: [TimeManagementPage, ShowOrderComponent]
})
export class TimeManagementPageModule {}
