import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { UpdateCustomerModel } from 'src/app/interfaces/update-customer.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent {

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService,
              private router: Router,

  ){}


  updateCustomerForm = this.formBuilder.group({
    fullName: this.accountService.customer.fullName,
    email: this.accountService.customer.email,
    phone: this.accountService.customer.phone.toString(),
    password: this.accountService.customer.password,
    documentType: this.accountService.customer.documentType,
    document: this.accountService.customer.document,
  });


  updateCustomer() {
    if (this.updateCustomerForm.controls.documentType.value
      && this.updateCustomerForm.controls.document.value
      && this.updateCustomerForm.controls.fullName.value
      && this.updateCustomerForm.controls.email.value
      && this.updateCustomerForm.controls.phone.value
      && this.updateCustomerForm.controls.password.value
    ) {

      const form: UpdateCustomerModel = {
        documentType: this.updateCustomerForm.controls.documentType.value,
        document: this.updateCustomerForm.controls.document.value,
        fullName: this.updateCustomerForm.controls.fullName.value,
        email: this.updateCustomerForm.controls.email.value,
        phone: this.updateCustomerForm.controls.phone.value,
        password: this.updateCustomerForm.controls.password.value,
      }
      this.accountService.postUpdateCustomer(this.accountService.customer.id, form).subscribe(data => {
        console.log(data);
        this.router.navigate(['account/user']);
      })
    }
  }
}
