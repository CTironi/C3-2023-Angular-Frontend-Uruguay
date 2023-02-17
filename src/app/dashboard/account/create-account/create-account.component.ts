import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { NewAccountModel } from '../../../interfaces/new-account.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService,
              private router: Router,
) { }


  newAccountForm = this.formBuilder.group({
    accountTypeName: this.formBuilder.nonNullable.control('', { validators: [Validators.required] }),
  });

  newAccount() {
    if (this.newAccountForm.controls.accountTypeName.value
    ) {
      const form: NewAccountModel = {
        customerId: this.accountService.customer.id,
        accountTypeName: this.newAccountForm.controls.accountTypeName.value,
      }
      this.accountService.postNewAccount(form).subscribe(data => {
        console.log(data);
        this.router.navigate(['account/user']);
      })
    }
  }
}
