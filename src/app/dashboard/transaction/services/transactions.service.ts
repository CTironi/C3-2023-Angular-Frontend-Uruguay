import { Injectable } from '@angular/core';
import { DepositModel } from 'src/app/interfaces/deposit.interface';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../services/api.service';
import { Observable } from 'rxjs';
import { DepositHistoyModel } from 'src/app/interfaces/deposit-history.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient,
              private api: ApiService,
    ) { }

  deposit: DepositHistoyModel[] = [];

  public getAllDeposit():Observable<DepositHistoyModel[]> {
    return this.http.get<DepositHistoyModel[]> (this.api.url + "/deposit/findAll");
  }
}
