import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiningTable } from 'src/app/interfaces/dining-table';
import { Meal } from 'src/app/interfaces/meal';
import { OrderLog } from 'src/app/interfaces/order-log';
import { OrderLogDetail } from 'src/app/interfaces/order-log-detail';
import { DialogService } from 'src/app/services/component/dialog.service';
import { DiningTableService } from 'src/app/services/dining-table.service';
import { MealAndPriceService } from 'src/app/services/meal-and-price.service';
import { OrderLogService } from 'src/app/services/order-log.service';
import { ModifyOrderQuantityComponent } from './dialogs/modify-order-quantity/modify-order-quantity.component';

@Component({
  selector: 'app-foodorder',
  templateUrl: './foodorder.page.html',
  styleUrls: ['./foodorder.page.scss'],
})
export class FoodorderPage implements OnInit {

  diningTables: DiningTable[] = [];
  meals: Map<string, Meal[]>;

  servedTableUid: string;
  ordered: Map<string, Meal[]>;
  totalPrice = 0;

  constructor(
    private diningTableSvc: DiningTableService,
    private mpSvc: MealAndPriceService,
    private orderLogSvc: OrderLogService,
    private dlgSvc: DialogService,
    private route: ActivatedRoute
  ) {
    this.getDiningTables();
    this.getMeals();
  }

  ngOnInit() {
    this.onReset();
  }

  getDiningTables() {
    const subscriber = this.diningTableSvc
      .findAll()
      .subscribe(data => {
        this.diningTables = data;
        const tableUid = this.route.snapshot.queryParams.tableUid;
        if(tableUid) {
          this.servedTableUid = tableUid;
        }
        subscriber.unsubscribe();
      });
  }

  getMeals() {
    const subscriber = this.mpSvc
      .getMeals()
      .subscribe(data => {
        this.meals = new Map<string, Meal[]>();
        data.forEach(d => {
          const typeName = d.classification.name;
          const meals = this.meals.get(typeName);
          if (meals) {
            meals.push(d);
          } else {
            this.meals.set(typeName, [d]);
          }
        });
        subscriber.unsubscribe();
      });
  }

  addToOrdered(mealKey: string, idx: number) {
    const meal = this.meals.get(mealKey)[idx];
    const meals = this.ordered.get(meal.name);

    console.error('計算材料可否繼續點餐');

    if (meals) {
      meals.push(meal);
    } else {
      this.ordered.set(meal.name, [meal]);
    }
    this.getTotalPrice();
  }

  modifyOrderedQuantity(orderedKey: string) {
    this.dlgSvc
    .presentModal(
      ModifyOrderQuantityComponent,
      {
        meals: this.ordered.get(orderedKey)
      },
      () => {
        if(this.ordered.get(orderedKey).length === 0) {
          this.ordered.delete(orderedKey);
        }
        this.getTotalPrice();
      }
    );
  }

  getTotalPrice() {
    let price = 0;
    for (const key of this.ordered.keys()) {
      const values = this.ordered.get(key);
      price += (values[0].price * values.length);
    }
    this.totalPrice = price;
  }

  async onOrdered() {
    const alert = await this.dlgSvc.presentAlertConfirm(
      '送出訂單?',
      `消費金額: ${this.totalPrice}`
    );

    alert.onWillDismiss().then((data) => {
      if (
        data.role === 'backdrop'
        || data.role === 'gesture'
        || data.role === 'cancel'
      ) {

      } else {
        this.sendOrder();
      }
    });
  }

  sendOrder() {
    const orderLogDetail: OrderLogDetail[] = [];
    for (const key of this.ordered.keys()) {
      const values = this.ordered.get(key);
      const meal: OrderLogDetail = {
        uid: null,
        orderQty: values.length,
        meal: values[0]
      };
      orderLogDetail.push(meal);
    }
    const orderLog: OrderLog = {
      uid: null,
      orderTime: new Date(),
      serveTime: null,
      cleanTime: null,
      tableUid: this.servedTableUid,
      details: orderLogDetail
    };
    this.orderLogSvc
      .saveOrUpdate(orderLog)
      .subscribe(data => {
        if(data) {
          this.onReset();
        }
      }, err=>{
        // console.log(err);
        this.dlgSvc.presentAlert('錯誤', err.error.message);
      });
  }

  onReset() {
    this.servedTableUid = '';
    this.ordered = new Map<string, Meal[]>();
    this.totalPrice = 0;
  }
}
