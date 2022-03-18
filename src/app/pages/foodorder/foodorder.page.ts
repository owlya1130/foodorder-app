import { Component, OnInit } from '@angular/core';
import { DiningTable } from 'src/app/interfaces/dining-table';
import { DiningTableService } from 'src/app/services/dining-table.service';

@Component({
  selector: 'app-foodorder',
  templateUrl: './foodorder.page.html',
  styleUrls: ['./foodorder.page.scss'],
})
export class FoodorderPage implements OnInit {

  diningTables: DiningTable[] = [];
  meals: any[] = [
    {c: "分類1", m:[{},{},{},{},{},{},{}]},
    {c: "分類2", m:[{},{},{},{},{},{},{},{},{},{},]},
    {c: "分類3", m:[{},{},{},{},{},{},{},{},{},{},]},
    {c: "分類4", m:[{},{},{},{},{},{},{},{},{},{},]},
    {c: "分類5", m:[{},{},{},{},{},{},{},{},{},{},]},
    {c: "分類6", m:[{},{},{},{},{},{},{},{},{},{},]},
    {c: "分類7", m:[{},{},{},{},{},{},{},{},{},{},]}
  ];
  servedTableUid = "";
  ordered: any[] = ['餐點1','餐點1','餐點1','餐點1','餐點1','餐點1','餐點1','餐點1','餐點1','餐點1','餐點1','餐點1','餐點1','餐點1','餐點1','餐點1','餐點1','餐點1','餐點1','餐點1','餐點1','餐點1','餐點1','餐點1','餐點1'];
  totalPrice = 0;

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

  addToOrdered() {
    alert("加入菜單");
    this.getTotalPrice();
  }

  removeFromOrdered() {
    alert("開窗移除菜單");
    this.getTotalPrice();
  }

  getTotalPrice() {
    alert("計算金額");
  }

  onOrdered() {
    alert("確認送單??")
    alert("送單");
  }
}
