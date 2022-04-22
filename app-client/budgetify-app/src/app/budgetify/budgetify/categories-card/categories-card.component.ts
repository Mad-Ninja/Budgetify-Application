import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ICategory } from 'src/app/models/categories';
import { BudgetifyService } from '../../services/budgetify.service';
import { AddBtnService } from '../add-button/services/add-btn.service';
import { CategoriesService } from '../categories/services/categories.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories-card',
  templateUrl: './categories-card.component.html',
  styleUrls: ['./categories-card.component.scss'],
})
export class CategoriesCardComponent implements OnInit {

  categoryName = new FormControl({value:'', disabled:true }, [
    Validators.required,
    Validators.maxLength(128),
    this.noWhitespaceValidator
  ])
  
  @Input() category!: ICategory;
  @ViewChild('categoryTitle') catTitleElemRef!: ElementRef;
  @ViewChild('categoryCard') catCard!: ElementRef;
  @ViewChild('edit') editBtn!: ElementRef;
  @ViewChild('done') doneBtn!: ElementRef;

 
  editAction: boolean = false;
  constructor(
    public categoriesService: CategoriesService,
    public addBtnService: AddBtnService,
    public budgetifyService: BudgetifyService,
    private renderer: Renderer2
  ) { }

  onEditClick() {
    this.editAction = true;
    this.categoryName.enable();
    this.catTitleElemRef.nativeElement.focus();
  }

  onDoneClick() {
    this.editAction = false;
    this.categoryName.disable();
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  ngOnInit(): void {}
}
