import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { ICard } from 'src/app/models/cards';
import { TransactionsService } from '../../main/transactions/services/transactions.service';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  public accountCards: ICard[] = [];
  isNoTransactions: boolean = false;
  constructor(
    private http: HttpClient,
    private transactionService: TransactionsService
  ) {}

  getAccounts() {
    return this.http.get<ICard[]>('http://localhost:3000/accounts').pipe(
      tap((res: ICard[]) => {
        this.accountCards = res;
      })
    );
  }
  clickOnCard(ev: any) {
    this.transactionService.getTransactions(ev.target.id).subscribe(
      (data) => {
        this.isNoTransactions = true;
      },
      (error) => {
        this.isNoTransactions = false;
      }
    );
  }
}
