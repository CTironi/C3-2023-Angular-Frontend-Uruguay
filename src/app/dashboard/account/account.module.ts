import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AccountRouteModule } from './account-route.module';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/modules/material/material.module';




@NgModule({
  declarations: [
    UserComponent,
    CreateAccountComponent,
    UpdateCustomerComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    AccountRouteModule,
  ],
})
export class AccountModule { }
