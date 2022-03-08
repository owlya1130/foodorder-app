import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'foodorder',
    pathMatch: 'full'
  },
  {
    path: 'foodorder',
    loadChildren: () => import('./pages/foodorder/foodorder.module').then( m => m.FoodorderPageModule)
  },
  {
    path: 'time-management',
    loadChildren: () => import('./pages/time-management/time-management.module').then( m => m.TimeManagementPageModule)
  },
  {
    path: 'reservation',
    loadChildren: () => import('./pages/reservation/reservation.module').then( m => m.ReservationPageModule)
  },
  {
    path: 'inventory-management',
    loadChildren: () => import('./pages/inventory-management/inventory-management.module').then( m => m.InventoryManagementPageModule)
  },
  {
    path: 'meal-and-price-management',
    loadChildren: () => import('./pages/meal-and-price-management/meal-and-price-management.module').then( m => m.MealAndPriceManagementPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
