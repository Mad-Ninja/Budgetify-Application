import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public cards = [
    {
      title: 'Debit card',
      amount: '7800',
      currency: '$',
    },
    {
      title: 'Credit card',
      amount: '800.23',
      currency: '$',
    },
    {
      title: 'Nice card',
      amount: '35',
      currency: '$',
    },
  ];

  public transactions = [
    {
      type:'Expenses',
      title:'Flat rent for March',
      category:'Home',
      description:'text',
      amount:'230',
      date: '13.9.2021', 
      icon: 'arrow_upward' 
    },
    {
      type:'Expenses',
      title:'Flat rent for March',
      category:'Home',
      description:'text',
      amount:'230',
      date: '13.9.2021', 
      icon: 'arrow_upward' 
    },
    {
      type:'Expenses',
      title:'Flat rent for March',
      category:'Home',
      description:'text',
      amount:'230',
      date: '13.9.2021', 
      icon: 'arrow_upward' 
    },
    {
      type:'Expenses',
      title:'Flat rent for March',
      category:'Home',
      description:'text',
      amount:'230',
      date: '13.9.2021', 
      icon: 'arrow_upward' 
    }
  ]

  add_button_titles = [
    'Add Add Transaction',
    'Add account'
  ]
  constructor() {}

  ngOnInit(): void {}
}
