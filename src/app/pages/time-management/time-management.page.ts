import { OrderLog } from './../../interfaces/order-log';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { DiningTable } from 'src/app/interfaces/dining-table';
import { DiningTableService } from 'src/app/services/dining-table.service';
import { OrderLogService } from 'src/app/services/order-log.service';
import { NavController } from '@ionic/angular';
import { DialogService } from 'src/app/services/component/dialog.service';
import { ShowOrderComponent } from './dialogs/show-order/show-order.component';

@Component({
  selector: 'app-time-management',
  templateUrl: './time-management.page.html',
  styleUrls: ['./time-management.page.scss'],
})
export class TimeManagementPage implements OnInit {

  tableLogs: TableLog[] = [];

  constructor(
    private diningTableSvc: DiningTableService,
    private orderLogSvc: OrderLogService,
    private dlgSvc: DialogService,
    private navCtrl: NavController
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.getData();
  }

  getData() {
    const forks = [];
    forks.push(this.diningTableSvc.findAll());
    forks.push(this.orderLogSvc.findAll());
    const subscriber = forkJoin(forks).subscribe(data => {
      const tables = data[0] as TableLog[];
      const orderLogs = data[1] as OrderLog[];

      for (const orderLog of orderLogs) {
        const tableUid = orderLog.tableUid;
        for (const table of tables) {
          if (table.uid === tableUid) {
            table.orderLog = orderLog;
            break;
          }
        }
      }
      this.tableLogs = tables;
      subscriber.unsubscribe();
    });
  }

  onOrdered(idx: number) {
    this.navCtrl.navigateForward(
      '/foodorder',
      {
        queryParams: {
          tableUid: this.tableLogs[idx].uid
        }
      });
  }

  onServed(idx: number) {
    const orderLog = this.tableLogs[idx].orderLog;
    orderLog.serveTime = new Date();
    this.orderLogSvc
      .saveOrUpdate(orderLog)
      .subscribe(data => {
        if (data) {
          this.getData();
        }
      });
  }

  onCleared(idx: number) {
    const orderLog = this.tableLogs[idx].orderLog;
    orderLog.cleanTime = new Date();
    this.orderLogSvc
      .saveOrUpdate(orderLog)
      .subscribe(data => {
        if (data) {
          this.getData();
        }
      });
  }

  showOrder(idx: number) {
    const orderLog = this.tableLogs[idx].orderLog;
    if (orderLog !== undefined) {
      this.dlgSvc
        .presentModal(
          ShowOrderComponent,
          {
            table: this.tableLogs[idx].name,
            orderLogDetails: orderLog.details
          }
        );
    }
  }
}

interface TableLog extends DiningTable {
  orderLog: OrderLog;
}
