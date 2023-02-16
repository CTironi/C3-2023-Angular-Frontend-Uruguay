import { AccountModel } from './account.interface';

export interface DepositHistoyModel {
  id: string;
  dateTime: string;
  accountId: AccountModel;
  amount: number;
}