import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventoryManagementPageRoutingModule } from './inventory-management-routing.module';

import { InventoryManagementPage } from './inventory-management.page';
import { AddInventoryComponent } from './dialogs/add-inventory/add-inventory.component';
import { RestockIngredientComponent } from './dialogs/restock-ingredient/restock-ingredient.component';
import { ConsumeIngredientComponent } from './dialogs/consume-ingredient/consume-ingredient.component';

const dialogs = [
  AddInventoryComponent,
  RestockIngredientComponent,
  ConsumeIngredientComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InventoryManagementPageRoutingModule
  ],
  declarations: [
    InventoryManagementPage,
    ...dialogs
  ]
})
export class InventoryManagementPageModule {}
