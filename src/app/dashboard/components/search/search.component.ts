import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountModel } from 'src/app/interfaces/account.interface';
import { LoginService } from 'src/app/modules/login/services/login.service';
import { AccountService } from '../../account/services/account.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  accounts: AccountModel[] = <AccountModel[]>this.loginService.customerAccounts;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private accountService: AccountService,
  ) { }
  
  searchAByCustomerForm = this.formBuilder.group({
    customerId: this.formBuilder.nonNullable.control('', { validators: [Validators.required] }),
  });

  getAccountsByCustomerId() {
    this.accountService.getAllAccount(this.searchAByCustomerForm.controls.customerId.value).subscribe({
      next: (response: AccountModel[]) => { console.log(this.accounts = response) },
      error: (error: HttpErrorResponse) => { alert(error.message) }
    })
  }

}
