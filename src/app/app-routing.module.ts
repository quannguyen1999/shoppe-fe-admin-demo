import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './components/accounts/accounts.component';
import { DasboardComponent } from './components/dasboard/dasboard.component';
import { PageNotFoundComponent } from './components/status/page-not-found/page-not-found.component';
import { CategorysComponent } from './components/categorys/categorys.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {
    path: 'home',
    component: AccountsComponent
  },
  {
    path: 'accounts',
    component: AccountsComponent
  },
  {
    path: 'categories',
    component: CategorysComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: '',
    redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
