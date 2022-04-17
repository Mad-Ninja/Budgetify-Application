import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BudgetifyService } from 'src/app/budgetify/services/budgetify.service';
import { SidenavService } from '../../sidenav/services/sidenav.service';

@Injectable({
  providedIn: 'root'
})
export class AddBtnService {
  
  private componentMethodCallSource = new Subject<any>();
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();
  constructor(private sidenavService: SidenavService, public budgetifyService: BudgetifyService) { }

  addAccountClick(){
    console.log(this.budgetifyService.currentUserCurrenceCode)
    this.sidenavService.changeSidenavContent('isAccountAdd');
    this.componentMethodCallSource.next(void 0);
  }
}
