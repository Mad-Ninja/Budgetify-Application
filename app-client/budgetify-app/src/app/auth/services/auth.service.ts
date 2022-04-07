import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserModel } from '../auth-form/auth-form.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user!: UserModel ;
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
      .post('http://localhost:3000/login', { email: email, password: password })
      .pipe(tap((res) => {
        this.setSession(res);
        
      }));
  }

  getUserData(data: any){
    return this.http.get<UserModel>('http://localhost:3000/users/' + data.id );
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
  }

  private setSession(res: any) {
    const expiresIn = Date.now() + Number(res.expiresIn);
    localStorage.setItem('idToken', res.token);
    localStorage.setItem('expiresIn', String(expiresIn));
  }

  sendData(element: UserModel){
    this.user = element;
    this.router.navigateByUrl('/budgetify/main');
  }

  getData(){
    let temp = this.user;
    return temp;
  }

}
