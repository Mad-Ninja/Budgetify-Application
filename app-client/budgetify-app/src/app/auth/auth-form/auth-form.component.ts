import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export interface UserModel {
  _id: string
  email: string
  password: string
  role: string
  firstName: string
  lastName: string
  gender: string
  birth: string
  country: string
  accounts?: []
  categories?: []
  _v?: number
}

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  
  user!: UserModel ;

  constructor(
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2
  ) {}

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe((data) => {
      console.log('successful login');
      console.log(data);
      this.getUser(data)
      
    });
  }

  getUser(data: any){
    this.authService.getUserData(data).subscribe((userData) => {
    
      this.user = userData
      console.log(this.user)
      this.authService.sendData(this.user)
      
    })
  }
  

  addBodyClass() {
    this.renderer.addClass(document.body, 'body__login-page');
  }
  ngOnInit() {
    this.addBodyClass();
  }
}
