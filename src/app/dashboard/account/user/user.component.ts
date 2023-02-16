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
    private accountService: AccountService,
    private loginService: LoginService,
  ) { }

  customers: CustomerModel[] = <CustomerModel[]>this.loginService.signedUpUsers;
  customer: CustomerModel = <CustomerModel>this.loginService.signedUpUser;
  customerId!: string;
  accounts: AccountModel[] = <AccountModel[]>this.loginService.customerAccounts;


  ngOnInit(): void {
    this.getCustomer();
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

  public getCustomer() {
    this.accountService.getcustomerByEmail().subscribe((response) => {
      this.customer = response,
      this.customerId = response.id
      }
    )
  }

  public getAccount() {
    this.accountService.getAllAccount(this.customerId).subscribe({
      next: (response: AccountModel[]) => { console.log(this.accounts = response) },
      error: (error: HttpErrorResponse) => { alert(error.message) }
    })
  }
}
