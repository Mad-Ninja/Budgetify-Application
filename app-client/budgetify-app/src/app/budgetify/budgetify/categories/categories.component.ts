import { Component, OnInit } from '@angular/core';
import { AddBtnService } from '../add-button/services/add-btn.service';
import { CategoriesService } from './services/categories.service';
import { BudgetifyService } from '../../services/budgetify.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  constructor(
    public categoriesService: CategoriesService,
    public addBtnService: AddBtnService,
    public budgetifyService: BudgetifyService
  ) {}

  ngOnInit(): void {
    this.addBtnService.isCategoryPage = true;
    this.addBtnService.isMainPage = false;
  }
}
