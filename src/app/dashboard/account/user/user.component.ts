import { CustomerModel } from 'src/app/interfaces/Customer.interface';
import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { LoginService } from 'src/app/modules/login/services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountModel } from 'src/app/interfaces/account.interface';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  constructor(
    protected accountService: AccountService,
    private loginService: LoginService,
  ) { }

  customers: CustomerModel[] = <CustomerModel[]>this.loginService.signedUpUsers;
  accounts: AccountModel[] = <AccountModel[]>this.loginService.customerAccounts;


  ngOnInit(): void {
    this.accountService.getCustomer();
    setTimeout(() => {
      this.getAccount();
    },500)
  }

  public getAllCustomer(): void {
    this.accountService.getAllCustomers().subscribe({
      next: (response: CustomerModel[]) => { console.log(this.customers = response) },
      error: (error: HttpErrorResponse) => { alert(error.message) }
    })
  }

  public getAccount() {
    this.accountService.getAllAccount(this.accountService.customerId).subscribe({
      next: (response: AccountModel[]) => { console.log(this.accounts = response) },
      error: (error: HttpErrorResponse) => { alert(error.message) }
    })
  }
}
