import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { ITransaction } from 'src/app/models/transactions';
import { CardService } from '../../../card/services/card.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  public transactionsCards: ITransaction[] = [];
  constructor(private http: HttpClient) {}
  transactionIcon(type: string) {
    return type == 'Expenses' ? 'arrow_upward' : 'arrow_downward';
  }

  getTransactions(accountId: string) {
    return this.http
      .get<ITransaction[]>(
        'http://localhost:3000/transactions/all/' + accountId
      )
      .pipe(
        tap((res: ITransaction[]) => {
          this.transactionsCards = res;
        })
      );
  }
}
