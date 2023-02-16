import { AccountModel } from './account.interface';

export interface TransferHistoryModel {
  id: string;
  outcome: AccountModel;
  income: AccountModel;
  amount: number;
  reason: string;
  dateTime?: string;
}