import { Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { PriceListComponent } from './pages/price-list/price-list.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { ProductAttributesComponent } from './pages/product-attributes/product-attributes.component';

export const inventory: Routes = [
  { path: 'category', component: CategoryComponent },
  { path: 'price-list', component: PriceListComponent },
  { path: 'products',  component: ProductFormComponent },
  { path: 'products/attributes',  component: ProductAttributesComponent }
];
