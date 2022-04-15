import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { BudgetifyService } from 'src/app/budgetify/services/budgetify.service';
import { ICard } from 'src/app/models/cards';
import { TransactionsService } from '../../main/transactions/services/transactions.service';
import { SidenavService } from '../../sidenav/services/sidenav.service';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  public accountCards: ICard[] = [];
  isTransactions: boolean = false;
  selectedIndex = 0;


  private componentMethodCallSource = new Subject<any>();
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  constructor(
    private http: HttpClient,
    private transactionService: TransactionsService,
    private budgetifyService: BudgetifyService,
    private sidenavService: SidenavService
  ) {}

  getAccounts() {
    return this.http.get<ICard[]>('http://localhost:3000/accounts').pipe(
      tap((res: ICard[]) => {
        this.accountCards = res;
        this.transactionService.getTransactions(this.accountCards[this.selectedIndex]._id).subscribe(
          (data) => {
            this.isTransactions = true;           
          },
          (error) => {
            this.isTransactions = false;
          }
        );
      })
    );
  }
  clickOnCard(ev: any, index: any) {
    console.log(index)
    this.transactionService.getTransactions(this.accountCards[index]._id).subscribe(
      (data) => {
        this.isTransactions = true;
        this.selectedIndex = index;
        
      },
      (error) => {
        this.isTransactions = false;
      }
    );
  }
  clickOnMoreDetails(event: any, index: any){  
    event.stopPropagation();
    this.sidenavService.isAccountInfo=true;
    this.sidenavService.accountInfoTitle = this.accountCards[index].name;
    this.sidenavService.accountInfoBalance =  this.accountCards[index].amount;
    this.sidenavService.accountInfoCurrency = this.accountCards[index].currency;
    this.sidenavService.accountInfoDescription = this.accountCards[index].description;
    this.componentMethodCallSource.next(void 0);
   


  }
}
