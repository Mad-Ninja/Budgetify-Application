import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SidenavService } from '../../sidenav/services/sidenav.service';

@Injectable({
  providedIn: 'root'
})
export class AddBtnService {
  
  private componentMethodCallSource = new Subject<any>();
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();
  constructor(private sidenavService: SidenavService) { }

  addAccountClick(){
    this.sidenavService.changeSidenavContent('isAccountAdd');
    this.componentMethodCallSource.next(void 0);
  }
}
