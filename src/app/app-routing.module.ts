import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './components/accounts/accounts.component';
import { DasboardComponent } from './components/dasboard/dasboard.component';

const routes: Routes = [
  {
    path: 'home',
    component: DasboardComponent
  },
  {
    path: 'accounts',
    component: AccountsComponent
  },
  {
    path: '',
    redirectTo: 'home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
