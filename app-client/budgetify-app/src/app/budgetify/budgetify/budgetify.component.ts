import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user';
import { BudgetifyService } from '../services/budgetify.service';

@Component({
  selector: 'app-budgetify',
  templateUrl: './budgetify.component.html',
  styleUrls: ['./budgetify.component.scss'],
})
export class BudgetifyComponent implements OnInit {
  authUserId: string = localStorage.getItem('id')!;
  show!: boolean;
  constructor(
    private renderer: Renderer2,
    private budgetifyService: BudgetifyService,
    private router: Router
  ) {}

  getUser(authUserId: string) {
    this.budgetifyService.getUserData(authUserId).subscribe((userData) => {
      this.show = true;
    });
  }

  removeBodyClass() {
    this.renderer.removeClass(document.body, 'body__login-page');
  }
  ngOnInit(): void {
    this.removeBodyClass();
    this.getUser(this.authUserId);
  }
}
