import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ICategory } from 'src/app/models/categories';
import { BudgetifyService } from '../../services/budgetify.service';
import { AddBtnService } from '../add-button/services/add-btn.service';
import { CategoriesService } from '../categories/services/categories.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SidenavService } from '../sidenav/services/sidenav.service';
import { CardService } from '../card/services/card.service';
import { ICard } from 'src/app/models/cards';
import { TransactionsService } from '../main/transactions/services/transactions.service';
import { ITransaction } from 'src/app/models/transactions';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-categories-card',
  templateUrl: './categories-card.component.html',
  styleUrls: ['./categories-card.component.scss'],
})
export class CategoriesCardComponent implements OnInit {
  categoryCardForm = new FormGroup({
    categoryName: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.maxLength(128),
      this.noWhitespaceValidator,
      this.titleCategoriesUniqValidation.bind(this),
    ]),
  });

  @Input() category!: ICategory;
  @Input() indexOfelement!: number;
  @ViewChild('categoryTitle') catTitleElemRef!: ElementRef;
  @ViewChild('categoryCard') catCard!: ElementRef;
  @ViewChild('edit') editBtn!: ElementRef;
  @ViewChild('done') doneBtn!: ElementRef;

  editAction: boolean = false;
  constructor(
    public categoriesService: CategoriesService,
    public transactionsService: TransactionsService,
    public cardService: CardService,
    public addBtnService: AddBtnService,
    public budgetifyService: BudgetifyService,
    public sidenavService: SidenavService,
    private renderer: Renderer2,
    public dialog: MatDialog
  ) {}

  // openDialog() {
  //   this.dialog.open(Popup);
  // }

  onEditClick() {
    console.log(this.indexOfelement);
    this.editAction = true;
    this.categoryCardForm.controls['categoryName'].enable();
    this.catTitleElemRef.nativeElement.focus();
  }

  onDoneClick() {
    this.editAction = false;
    this.categoryCardForm.controls['categoryName'].disable();
    const { categoryName } = this.categoryCardForm.value;
    const category = {
      name: categoryName,
      type: this.category.type,
    };


    this.categoriesService.editCategory(category, this.category.name).subscribe(
      (data) => {
        this.budgetifyService
          .getUserData(localStorage.getItem('id')!)
          .subscribe(
            (data) => {},
            (error) => {}
          );
        this.sidenavService.showToast('Category successfully edited', 'success');
      },
      (error) => {}
    );
  }

  onCloseClick() {
    this.editAction = false;
    this.categoryCardForm.controls['categoryName'].disable();
    this.categoryCardForm.controls['categoryName'].setValue(this.category.name);
  }

  onDeleteClick() {
    console.log(this.categoriesService.allUserTransactions)
    console.log(this.category.name)
    console.log(this.category.type)
    const incomes = this.categoriesService.allUserTransactions.filter(
      (item) => item.type === 'Income'
    );
    const expenses = this.categoriesService.allUserTransactions.filter(
      (item) => item.type === 'Expenses'
    );
    if (this.category.type === 'income') {
      for(let i=0;i<incomes.length;i++){
        let item = incomes[i].category;
        console.log(item)
        if (item.some(string => string === this.category.name)) {
          this.sidenavService.showToast(
            'This category can`t be removed because it contains information about your transactions', 'danger'
          );
          return;
        }
      }      
    }
    if (this.category.type === 'expense') {
      for(let i=0;i<expenses.length;i++){
        let item = expenses[i].category;
        console.log(item)
        if (item.some(string => string === this.category.name)) {
          this.sidenavService.showToast(
            'This category can`t be removed because it contains information about your transactions', 'danger'
          );
          return;
        }
      }
    }
    const name = this.category.name;
    const type = this.category.type;
    this.categoriesService.deleteCategory(name, type).subscribe(
      (data) => {
        this.budgetifyService
          .getUserData(localStorage.getItem('id')!)
          .subscribe(
            (data) => {},
            (error) => {}
          );
        this.sidenavService.showToast('Category successfully deleted', 'success');
      },
      (error) => {}
    );
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  titleCategoriesUniqValidation(
    control: FormControl
  ): { [key: string]: boolean } | null {
    const title = control.value;
    // if (
    //   title?.toLowerCase() ===
    //   this.budgetifyService.user.categories[
    //     this.indexOfelement
    //   ].name?.toLocaleLowerCase()
    // ) {
    //   return null;
    // }
    const isTitleExist = this.budgetifyService.user.categories?.some(
      (category: ICategory) =>
        category.name?.toLowerCase() === title?.toLowerCase() &&
        category.type?.toLowerCase() === this.category.type?.toLowerCase()
    );
    return isTitleExist ? { uniqTitle: true } : null;
  }

  ngOnInit(): void {}
}
