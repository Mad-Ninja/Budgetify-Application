import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-budgetify',
  templateUrl: './budgetify.component.html',
  styleUrls: ['./budgetify.component.scss']
})
export class BudgetifyComponent implements OnInit {
  constructor(private renderer: Renderer2, ) { }


  removeBodyClass(){
    this.renderer.removeClass(document.body, 'body__login-page');
  }
  ngOnInit(): void {
    this.removeBodyClass();
  }

}
