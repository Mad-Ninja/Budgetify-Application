import { Component, OnInit } from '@angular/core';
import { CardService } from '../card/services/card.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  add_button_titles = ['Add Add Transaction', 'Add account'];
  isNoTransactions: boolean = false;
  constructor(public cardService: CardService) {}

  ngOnInit(): void {}
}
