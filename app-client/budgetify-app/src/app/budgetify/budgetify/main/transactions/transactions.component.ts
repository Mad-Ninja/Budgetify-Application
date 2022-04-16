import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  transaction = {
    type:'Expenses',
    title:'Flat rent for March',
    category:'Home',
    description:'text',
    amount:'230',
    date: '13.9.2021', 
    icon: 'arrow_upward' 
  }
  constructor() { }

  ngOnInit(): void {
  }

}
