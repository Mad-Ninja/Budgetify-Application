import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { CardService } from '../card/services/card.service';
import { SidenavService } from './services/sidenav.service';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @ViewChild('formAddAccount') public formAA:any;
  addAccountForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    currency: new FormControl(this.sidenavService.currentUserCode, [
      Validators.required,
    ]),
    description: new FormControl(''),
  });
  constructor(
    public sidenavService: SidenavService,
    private cardService: CardService,
    private toaster: Toaster
  ) {}

  showToast() {
    this.toaster.open({ text: 'Account created', type: 'success' , duration:5000,position:'top-center'});
  }

  onSaveAccount() {
    const { title, currency, description } = this.addAccountForm.value;
    const curr = this.sidenavService.currenciesMy.filter(
      (obj) => obj.name === currency
    )[0];

    this.sidenavService.addAccount(title, curr, description).subscribe(
      (data) => {
        this.sidenavService.closeSidenav();
        this.showToast();
        this.cardService.getAccounts().subscribe(() => {});
        this.formAA.reset();
      },
      (error) => {}
    );
  }
  ngOnInit(): void {}
}
