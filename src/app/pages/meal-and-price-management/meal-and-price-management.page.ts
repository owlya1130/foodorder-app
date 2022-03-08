import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meal-and-price-management',
  templateUrl: './meal-and-price-management.page.html',
  styleUrls: ['./meal-and-price-management.page.scss'],
})
export class MealAndPriceManagementPage implements OnInit {

  tabSelected = "meal";

  constructor() { }

  ngOnInit() {
  }

}
