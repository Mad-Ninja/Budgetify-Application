import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IAuth } from 'src/app/models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authData: IAuth = {
    email: '',
    expiresIn: 0,
    id: '',
    role: '',
    token: '',
  };
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    const body = new HttpParams().set('email', email).set('password', password);

    return this.http
      .post<IAuth>('http://localhost:3000/login', body, {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      })
      .pipe(
        tap((res: IAuth) => {
          this.setSession(res);
        })
      );
  }

  isLoggedIn() {
    const expiresIn = localStorage.getItem('expiresIn');
    if (expiresIn) {
      return Date.now() < Number(expiresIn);
    }
    return false;
  }

  logOut() {
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('idToken');
    localStorage.removeItem('id');
  }

  private setSession(res: IAuth) {
    const expiresIn = Date.now() + Number(res.expiresIn);
    localStorage.setItem('idToken', res.token);
    localStorage.setItem('expiresIn', String(expiresIn));
    localStorage.setItem('id', res.id);
  }

  sendData(element: IAuth) {
    this.authData = element;
    this.router.navigateByUrl('/budgetify/main');
  }

  getData() {
    let temp = this.authData;
    return temp.id;
  }
}
