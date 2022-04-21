import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ICurrency } from 'src/app/models/currency';

import { BudgetifyService } from 'src/app/budgetify/services/budgetify.service';
import { HttpClient } from '@angular/common/http';
import { Toaster } from 'ngx-toast-notifications';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  popupTitle!:string;
  popupText!:string;
  accountInfoTitle!: string;
  accountInfoBalance!: number;
  accountInfoCurrencySymbol!: string;
  accountInfoCurrencyCode!: string;
  accountInfoDescription!: string;
  isAccountInfo!: boolean;
  isAccountAdd!: boolean;
  isAccountEdit!: boolean;

  private componentMethodCallSource = new Subject<any>();
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  constructor(
    
    private budgetifyService: BudgetifyService,
    private http: HttpClient,
    private toaster: Toaster,
  ) {}

  showToast(text: string) {
    this.toaster.open({
      text: text,
      type: 'success',
      duration: 5000,
      position: 'top-center',
    });
  }

  changeSidenavContent(target: string) {
    if (target === 'isAccountAdd') {
      this.isAccountAdd = true;
      this.isAccountInfo = false;
      this.isAccountEdit = false
    } else if (target === 'isAccountInfo') {
      this.popupTitle = 'Delete account';
      this.popupText = 'Are you sure you want to delete this account?'
      this.isAccountInfo = true;
      this.isAccountAdd = false;
      this.isAccountEdit = false
    } else if (target === 'isAccountEdit'){
      this.isAccountEdit = true;
      this.isAccountInfo = false;
      this.isAccountAdd = false;

    }
  }
  closeSidenav() {
    this.componentMethodCallSource.next(void 0);
  }

  addAccount(title: string, curr: ICurrency, description: string) {
    
    const account = {
      name: title,
      currency: curr,
      description: description,
    };
    return this.http.post('http://localhost:3000/accounts', account);
  }

  editAccount(title: string, curr: ICurrency, description: string, accountId: string){
    const editedAccount = {
      name: title,
      currency: curr,
      description: description,
    }
    return this.http.patch('http://localhost:3000/accounts/' + accountId , editedAccount)
  }

  deleteAccount( accountId: string){
    return this.http.delete('http://localhost:3000/accounts/' + accountId)
  }
}
