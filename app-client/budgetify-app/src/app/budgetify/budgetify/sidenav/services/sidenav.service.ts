import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  isAccountInfo!:boolean;
  accountInfoTitle!:string;
  accountInfoBalance!:number;
  accountInfoCurrency!:string;
  accountInfoDescription!:string;


  
  private componentMethodCallSource = new Subject<any>();
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();
  constructor() { }

  closeSidenav(){
    this.componentMethodCallSource.next(void 0);
  }
}
