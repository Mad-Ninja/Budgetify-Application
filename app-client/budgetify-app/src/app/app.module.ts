import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { BudgetifyModule } from './budgetify/budgetify.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthFormComponent } from './auth/auth-form/auth-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    SharedModule,
    BudgetifyModule,
    HttpClientModule,
    AppRoutingModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },{
      provide: AuthFormComponent
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
