import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './components/accounts/accounts.component';
import { DasboardComponent } from './components/dasboard/dasboard.component';
import { PageNotFoundComponent } from './components/status/page-not-found/page-not-found.component';
import { CategorysComponent } from './components/categorys/categorys.component';
import { ProductsComponent } from './components/products/products.component';
import { authServiceGuard } from './services/auth-service.guard';
import { PageErrorComponent } from './components/status/page-error/page-error.component';
import { AuthenticationResolver } from './config/authorization-config.resolver';

const routes: Routes = [
  {
    path: 'home',
    component: DasboardComponent,
    canActivate: [authServiceGuard]
  },
  {
    path: 'accounts',
    component: AccountsComponent,
    canActivate: [authServiceGuard]
  },
  {
    path: 'categories',
    component: CategorysComponent,
    canActivate: [authServiceGuard]
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [authServiceGuard]
  },
  {
    path: 'error',
    component: PageErrorComponent
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent
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
