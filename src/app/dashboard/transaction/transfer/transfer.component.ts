import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TransferModel } from 'src/app/interfaces/transfer.interface';
import { ApiService } from 'src/app/services/api.service';
import { TransferHistoryModel } from 'src/app/interfaces/transfer-history.interface';
import { TransactionsService } from '../services/transactions.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent {

  constructor(private formBuilder: FormBuilder,
              private api: ApiService,
              private http: HttpClient,
              private router: Router,
              private transactionsService: TransactionsService,
  ) { }
  
  transfers: TransferHistoryModel[] = []

  transferForm = this.formBuilder.group({
    outcomeID: this.formBuilder.nonNullable.control('', { validators: [Validators.required] }),
    incomeID: this.formBuilder.nonNullable.control('', { validators: [Validators.required] }),
    amount: this.formBuilder.nonNullable.control('', { validators: [Validators.required] }),
    reason: this.formBuilder.nonNullable.control('', { validators: [Validators.required] }),
  });

  getTransferByAccount = this.formBuilder.group({
    accountId: this.formBuilder.nonNullable.control('', { validators: [Validators.required] }),
  });

  transfer(form: TransferModel): Observable<TransferModel> {
    let direction = this.api.url + "/transfer/create";
    return this.http.post<TransferModel>(direction, form);
  }

  creatreTransfer() {
    if ( this.transferForm.controls.outcomeID.value 
      && this.transferForm.controls.incomeID.value
      && this.transferForm.controls.amount.value
      && this.transferForm.controls.reason.value
      ) {
      let form = {
        outcomeID: this.transferForm.controls.outcomeID.value ,
        incomeID: this.transferForm.controls.incomeID.value,
        amount: + this.transferForm.controls.amount.value,
        reason: this.transferForm.controls.reason.value,
      }
      this.transfer(form).subscribe(data => {
        console.log(data);
        this.router.navigate(['account/user'])
      })
    }
  }

  getTransfer() {
    this.transactionsService.getAllTransfer(this.getTransferByAccount.controls.accountId.value).subscribe({
      next: (response: TransferHistoryModel[]) => { console.log(this.transfers = response) },
      error: (error: HttpErrorResponse) => { alert(error.message) }
    })
  }
}
