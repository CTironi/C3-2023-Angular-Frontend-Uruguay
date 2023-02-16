import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GuardGuard } from "src/app/modules/shared/guards/guard.guard";
import { CreateAccountComponent } from "./create-account/create-account.component";
import { UserComponent } from "./user/user.component";
import { UpdateCustomerComponent } from './update-customer/update-customer.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'createAccount', component: CreateAccountComponent, canActivate: [GuardGuard]},
      {path: 'user', component: UserComponent, canActivate: [GuardGuard]},
      {path: 'updateUser', component: UpdateCustomerComponent, canActivate: [GuardGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRouteModule {}
