import { Route } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';

export const routes: Route[] = [
  { path: 'products', component: ProductListComponent },
  { path: 'create-product', component: ProductCreateComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];

