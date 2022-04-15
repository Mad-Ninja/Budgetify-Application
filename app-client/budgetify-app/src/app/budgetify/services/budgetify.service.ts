import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class BudgetifyService {
 
  user: UserModel = {
    _id: '',
    email: '',
    password: '',
    role: '',
    firstName: '',
    lastName: '',
    gender: '',
    birth: '',
    country: '',
    categories: [],
  };
  constructor(private http: HttpClient, private router: Router) {}

  getUserData(authUserId: string) {
    return this.http
      .get<UserModel>('http://localhost:3000/users/' + authUserId)
      .pipe(
        tap((res: UserModel) => {
          this.user = res;
        })
      );
  }
}
