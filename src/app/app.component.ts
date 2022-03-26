import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appPages = [
    { title: '點餐', url: '/foodorder', icon: 'restaurant-outline' },
    { title: '用餐時間管理', url: '/time-management', icon: 'timer-outline' },
    { title: '預約', url: '/reservation', icon: 'calendar-number-outline' },
    { title: '庫存管理', url: '/inventory-management', icon: 'storefront-outline' },
    { title: '餐點及價格管理', url: '/meal-and-price-management', icon: 'cash-outline' }
  ];
  constructor() { }
}
