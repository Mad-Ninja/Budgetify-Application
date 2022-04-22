import { Injectable } from '@angular/core';
import { BudgetifyService } from 'src/app/budgetify/services/budgetify.service';
import { ICategory } from 'src/app/models/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  public categories?:ICategory[]=  this.budgetifyService.user.categories;
  
  constructor(public budgetifyService: BudgetifyService) { }



}
