import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DepositModel } from 'src/app/interfaces/deposit.interface';
import { ApiService } from '../../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent {

  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private http: HttpClient,
    private router: Router,
  ) { }

  depositForm = this.formBuilder.group({
    accountId: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required)
  });

  depo(form: DepositModel): Observable<DepositModel> {
    let direction = this.api.url + "/deposit/createDeposit";
    return this.http.post<DepositModel>(direction, form);
  }

  deposit() {
    if (this.depositForm.controls.accountId.value && this.depositForm.controls.amount.value) {
      let form = {
        accountId: this.depositForm.controls.accountId.value,
        amount: + this.depositForm.controls.amount.value
      }
      this.depo(form).subscribe(data => {
        console.log(data);
        this.router.navigate(['account/user'])
      })
    }
  }

}
