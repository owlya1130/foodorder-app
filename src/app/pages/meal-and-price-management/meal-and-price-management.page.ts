import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DialogService } from 'src/app/services/component/dialog.service';
import { MealAndPriceService } from 'src/app/services/meal-and-price.service';
import { DiscountSettingComponent } from './dialogs/discount-setting/discount-setting.component';
import { MealSettingComponent } from './dialogs/meal-setting/meal-setting.component';

@Component({
  selector: 'app-meal-and-price-management',
  templateUrl: './meal-and-price-management.page.html',
  styleUrls: ['./meal-and-price-management.page.scss'],
})
export class MealAndPriceManagementPage implements OnInit, AfterViewInit {

  tabSelected = 'meal';
  mealList = [];
  discountList = [];

  constructor(
    private mpSvc: MealAndPriceService,
    private dlgSvc: DialogService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.onTabChanged();
  }

  onTabChanged() {
    if (this.tabSelected === 'meal') {
      this.getMeals();
    } else if (this.tabSelected === 'discount') {
      this.getDiscounts();
    }
  }

  getMeals() {
    this.mpSvc
      .getMeals()
      .subscribe(data => {
        this.mealList = data;
      });
  }

  getDiscounts() {
    this.mpSvc
    .getDiscounts()
    .subscribe(data=>{
      this.discountList = data;
    });
  }

  addItem() {
    switch (this.tabSelected) {
      case 'meal':
        this.dlgSvc
          .presentModal(
            MealSettingComponent,
            {},
            () => { this.getMeals(); }
          );
        break;
      case 'discount':
        this.dlgSvc
        .presentModal(
          DiscountSettingComponent,
          {},
          () => { this.getDiscounts(); }
        );
        break;
    }
  }

  configureItem(idx: number) {
    switch (this.tabSelected) {
      case 'meal':
        this.dlgSvc
          .presentModal(
            MealSettingComponent,
            { mealCfg: this.mealList[idx]},
            () => { this.getMeals(); }
          );
        break;
      case 'discount':
        this.dlgSvc
        .presentModal(
          DiscountSettingComponent,
          { discountCfg: this.discountList[idx]},
          () => { this.getDiscounts(); }
        );
        break;
    }
  }
}
