import { Component, OnInit } from '@angular/core';
import { StatisticService } from './services/statistic.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CardService } from '../card/services/card.service';
import { TransactionsService } from '../main/transactions/services/transactions.service';
import { ITransaction } from 'src/app/models/transactions';
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
})
export class StatisticComponent implements OnInit {
  buttonValue?: string = 'categories';
  isShowCategories: boolean = true;
  isShowMonthly: boolean = false;
  totalExpensesSum: string;
  transactionsFilteredByRange: ITransaction[] =
    this.transactionsService.transactionsCards;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    public statisticService: StatisticService,
    public cardService: CardService,
    public transactionsService: TransactionsService
  ) {
    this.cardService.componentMethodCalled1$.subscribe(() => {
      this.transactionsFilteredByRange =
        this.transactionsService.transactionsCards;
    });
    this.cardService.componentMethodCalled1$.subscribe(() => {
      this.getCategoriesStat();
    });
  }

  //Cetegories table
  displayedColumnsCategories: string[] = ['category', 'amount', 'total'];
  dataSource = this.statisticService.CATEGORIES_STATISTIC;

  //Monthly table
  displayedColumnsMonthly: string[] = [
    'month',
    'income',
    'expense',
    'economy',
    'percentOfEconomy',
  ];

  toggleDisplay() {
    if (this.buttonValue == 'monthly') {
      this.isShowCategories = false;
      this.isShowMonthly = true;
    } else if (this.buttonValue == 'categories') {
      this.isShowCategories = true;
      this.isShowMonthly = false;
    }
  }

  selectDateStart() {
    this.transactionsFilteredByRange = [];
    if (this.range.value.start?._d === null) {
      this.transactionsFilteredByRange =
        this.transactionsService.transactionsCards;
      this.getCategoriesStat();
      return;
    }
    this.transactionsFilteredByRange =
      this.transactionsService.transactionsCards.filter((transaction) => {
        return (
          new Date(transaction.dateOfPayment) >=
          new Date(this.range.value.start?._d)
        );
      });

    this.getCategoriesStat();
  }

  selectDateEnd() {
    console.log(new Date(this.range.value.start?._d));
    console.log(this.range.value.end?._d);
    this.transactionsFilteredByRange = [];
    if(this.range.value.start?._d == undefined){
      this.transactionsFilteredByRange =
      this.transactionsService.transactionsCards;
    this.getCategoriesStat();
    return;
    }
    if(this.range.value.start?._d != undefined && this.range.value.end?._d == undefined){
      this.transactionsFilteredByRange =
      this.transactionsService.transactionsCards.filter((transaction) => {
        return (
          new Date(transaction.dateOfPayment) >=
          new Date(this.range.value.start?._d)
        );
      });
    this.getCategoriesStat();
    return;
    }
   
    this.transactionsFilteredByRange =
      this.transactionsService.transactionsCards.filter((transaction) => {
        return (
          new Date(transaction.dateOfPayment) >=
            new Date(this.range.value.start?._d) &&
          new Date(transaction.dateOfPayment) <=
            new Date(this.range.value.end?._d)
        );
      });

    console.log(this.transactionsFilteredByRange);
    this.getCategoriesStat();
  }

  getCategoriesStat() {
    const map = new Map();
    const totalSum = this.transactionsFilteredByRange.reduce(
      (accum, current) => {
        if (current.type === 'Income') {
          return accum;
        }
        return accum + current.amount;
      },
      0
    );
    console.log(totalSum);
    this.transactionsFilteredByRange.forEach((transaction: ITransaction) => {
      if (transaction.type === 'Income') {
        return;
      }
      transaction.category.forEach((categoryName: string) => {
        if (!map.get(categoryName)) {
          const percent = +((transaction.amount / totalSum) * 100).toFixed(1);
          map.set(categoryName, {
            category: categoryName,
            amount: transaction.amount,
            total: percent,
          });
          return;
        }
        const cat = map.get(categoryName);
        cat['amount'] += transaction.amount;
        cat['total'] = +((cat['amount'] / totalSum) * 100).toFixed(1);
      });
    });
    this.statisticService.CATEGORIES_STATISTIC = [...map.values()];
    this.totalExpensesSum =
      totalSum +
      this.cardService.accountCards[this.cardService.selectedIndex].currency
        .symbolNative;
  }

  ngOnInit(): void {
    this.getCategoriesStat();
  }
}
