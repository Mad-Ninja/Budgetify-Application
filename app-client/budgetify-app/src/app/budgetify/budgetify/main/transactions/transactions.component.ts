import { Component, OnInit } from '@angular/core';
import { CardService } from '../../card/services/card.service';
import { TransactionsService } from './services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {


  constructor(public transactionService: TransactionsService,public cardService:CardService) { }

  ngOnInit(): void {
  }

}
