import { Injectable } from '@angular/core';

interface CategoriesStatistic {
  category: string;
  amount: string;
  total: string;
}
interface MonthlyStatistic {
  month: string;
  income: number;
  expense: number;
  economy: number;
  percentOfEconomy: number;
}

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  CATEGORIES_STATISTIC: CategoriesStatistic[] = [
    {
      category: 'Food',
      amount: '25$',
      total: '30%',
    },
    {
      category: 'House',
      amount: '25$',
      total: '30%',
    },
    {
      category: 'Family',
      amount: '25$',
      total: '30%',
    },
  ];

  MONTHLY_STATISTIC: MonthlyStatistic[] = [
    {
      month: 'January 2021',
      income: 30,
      expense: 10,
      economy: 20,
      percentOfEconomy: 66.6,
    },
    {
      month: 'February 2021',
      income: 30,
      expense: 10,
      economy: 20,
      percentOfEconomy: 66.6,
    },
    {
      month: 'March 2021',
      income: 30,
      expense: 10,
      economy: 20,
      percentOfEconomy: 66.6,
    },
  ];
  constructor() {}

  getTotalIncome() {
    return this.MONTHLY_STATISTIC.map((t) => t.income).reduce(
      (acc, value) => acc + value,
      0
    );
  }
  getTotalExpenses() {
    return this.MONTHLY_STATISTIC.map((t) => t.expense).reduce(
      (acc, value) => acc + value,
      0
    );
  }
  getTotalEconomy() {
    return this.MONTHLY_STATISTIC.map((t) => t.economy).reduce(
      (acc, value) => acc + value,
      0
    );
  }
  getTotalPercentOfEconomy() {
    return this.MONTHLY_STATISTIC.map((t) => t.percentOfEconomy).reduce(
      (acc, value) => acc + value,
      0
    );
  }
}
