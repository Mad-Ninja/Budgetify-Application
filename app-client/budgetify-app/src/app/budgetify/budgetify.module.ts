import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetifyComponent } from './budgetify/budgetify.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { HeaderComponent } from './budgetify/header/header.component';
import { FooterComponent } from './budgetify/footer/footer.component';
import { MainComponent } from './budgetify/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { CardComponent } from './budgetify/main/card/card.component';
import { TransactionsComponent } from './budgetify/main/transactions/transactions.component';
import { SearchFieldComponent } from './budgetify/search-field/search-field.component';
import { AddButtonComponent } from './budgetify/add-button/add-button.component';

const routes: Routes = [
  {
    path: 'budgetify/main',
    component: BudgetifyComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  declarations: [
    BudgetifyComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    CardComponent,
    TransactionsComponent,
    SearchFieldComponent,
    AddButtonComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    HttpClientModule,
  ],
})
export class BudgetifyModule {}
