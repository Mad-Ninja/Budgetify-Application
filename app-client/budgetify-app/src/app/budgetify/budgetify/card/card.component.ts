import { Component, Input, OnInit } from '@angular/core';
import { ICard } from 'src/app/models/cards';
import { CardService } from './services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  constructor(public cardService: CardService) {}

  ngOnInit(): void {
    this.cardService.getAccounts().subscribe(() => {});
  }
}
