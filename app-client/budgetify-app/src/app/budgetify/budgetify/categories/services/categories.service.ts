import { Injectable } from '@angular/core';
import { BudgetifyService } from 'src/app/budgetify/services/budgetify.service';
import { ICategory } from 'src/app/models/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  public categories?:ICategory[]=  this.budgetifyService.user.categories;
  editAction:boolean = false;
  contenteditable:boolean = false;
  constructor(public budgetifyService: BudgetifyService) { }

  editClick(){
    this.editAction = true;
  }
  doneClick(){
    this.editAction = false;
  }

}
