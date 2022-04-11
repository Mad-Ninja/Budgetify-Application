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
import { CardComponent } from './budgetify/card/card.component';
import { TransactionsComponent } from './budgetify/main/transactions/transactions.component';
import { SearchFieldComponent } from './budgetify/search-field/search-field.component';
import { AddButtonComponent } from './budgetify/add-button/add-button.component';
import { SidenavComponent } from './budgetify/sidenav/sidenav.component';
import { StatisticComponent } from './budgetify/statistic/statistic.component';
import { CategoriesComponent } from './budgetify/categories/categories.component';
import { TransactionsFilterBtnComponent } from './budgetify/transactions-filter-btn/transactions-filter-btn.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'budgetify',
    component: BudgetifyComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
      },
      {
        path: 'main',
        component: MainComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'statistic',
        component: StatisticComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [AuthGuard],
      },
    ],
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
    SidenavComponent,
    StatisticComponent,
    CategoriesComponent,
    TransactionsFilterBtnComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
  ],
})
export class BudgetifyModule {}
