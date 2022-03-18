import { Component, OnInit } from '@angular/core';
import { DiningTable } from 'src/app/interfaces/dining-table';
import { DiningTableService } from 'src/app/services/dining-table.service';

@Component({
  selector: 'app-time-management',
  templateUrl: './time-management.page.html',
  styleUrls: ['./time-management.page.scss'],
})
export class TimeManagementPage implements OnInit {

  diningTables: DiningTable[] = [];

  constructor(
    private diningTableSvc: DiningTableService
  ) {
    this.getDiningTables();
  }

  ngOnInit() {
  }

  getDiningTables() {
    this.diningTableSvc
      .findAll()
      .subscribe(data => {
        this.diningTables = data as DiningTable[];
      });
  }

  onOrdered(tableUid: string) {
    alert("跳轉至點餐頁面");
    alert("完成點餐: "+tableUid);
    alert("點餐時間: "+new Date());
  }

  onServed(tableUid: string) {
    alert("完成上菜: "+tableUid);
    alert("上菜時間: "+new Date());
  }

  onCleared(tableUid: string) {
    alert("完成清潔: "+tableUid);
    alert("清潔時間: "+new Date());
  }

}
