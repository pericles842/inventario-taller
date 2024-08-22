import { Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { PriceListComponent } from './pages/price-list/price-list.component';

export const inventory: Routes = [
  {
    path: 'category', component: CategoryComponent
  },
  {
    path: 'price-list', component: PriceListComponent
  }
];
