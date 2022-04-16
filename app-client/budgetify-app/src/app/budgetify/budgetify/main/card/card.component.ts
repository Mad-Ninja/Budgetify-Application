import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public card = 
    {
      title: 'Debit card',
      amount: '7800',
      currency: '$',
    }
  
  constructor() { }

  ngOnInit(): void {
  }

}
