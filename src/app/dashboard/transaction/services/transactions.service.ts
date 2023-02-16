import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../services/api.service';
import { Observable } from 'rxjs';
import { DepositHistoyModel } from 'src/app/interfaces/deposit-history.interface';
import { TransferHistoryModel } from 'src/app/interfaces/transfer-history.interface';


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

  public getAllTransfer(id: string):Observable<TransferHistoryModel[]> {
    return this.http.get<TransferHistoryModel[]> (this.api.url + "/transfer/getHistory/" + id);
  }
}
