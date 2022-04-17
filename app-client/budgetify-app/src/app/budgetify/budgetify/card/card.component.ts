import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ICard } from 'src/app/models/cards';
import { TransactionsService } from '../main/transactions/services/transactions.service';
import { CardService } from './services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  constructor(
    public cardService: CardService,
    private transactionService: TransactionsService
  ) {}

  ngOnInit(): void {
    this.cardService.getAccounts().subscribe(
      (data) => {
        this.cardService.isAccounts = true;
        this.cardService.accountCards = data;
        this.transactionService
          .getTransactions(this.cardService.accountCards[this.cardService.selectedIndex]._id)
          .subscribe(
            (data) => {
              this.cardService.isTransactions = true;
            },
            (error) => {
              this.cardService.isTransactions = false;
            }
          );
      },
      (error) => {
        this.cardService.isAccounts = false;
      }
    );
  }
}
