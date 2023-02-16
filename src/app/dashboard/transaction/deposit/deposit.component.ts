import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DepositModel } from 'src/app/interfaces/deposit.interface';
import { ApiService } from '../../../services/api.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TransactionsService } from '../services/transactions.service';
import { DepositHistoyModel } from 'src/app/interfaces/deposit-history.interface';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent {

  deposit: DepositHistoyModel[] = [];

  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private http: HttpClient,
    private router: Router,
    private transactionService: TransactionsService,
  ) { }

  ngOnInit(): void {
    this.getDeposit(); 
  }

  depositForm = this.formBuilder.group({
    accountId: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required)
  });

  depo(form: DepositModel): Observable<DepositModel> {
    let direction = this.api.url + "/deposit/createDeposit";
    return this.http.post<DepositModel>(direction, form);
  }

  newdeposit() {
    if (this.depositForm.controls.accountId.value && this.depositForm.controls.amount.value) {
      let form = {
        accountId: this.depositForm.controls.accountId.value,
        amount: + this.depositForm.controls.amount.value
      }
      this.depo(form).subscribe(data => {
        console.log(data)
        this.router.navigate(['account/user'])
      })
    }
  }

  public getDeposit() {
    this.transactionService.getAllDeposit().subscribe({
      next: (response: DepositHistoyModel[]) => this.deposit = response
    })
  }

}
