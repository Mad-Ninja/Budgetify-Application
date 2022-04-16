import { Component, OnInit } from '@angular/core';
import { StatisticService } from './services/statistic.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
})
export class StatisticComponent implements OnInit {
  buttonValue?: string = 'categories';
  isShowCategories: boolean = true;
  isShowMonthly: boolean = false;

  constructor(public statisticService: StatisticService) {}

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

  ngOnInit(): void {}
}
