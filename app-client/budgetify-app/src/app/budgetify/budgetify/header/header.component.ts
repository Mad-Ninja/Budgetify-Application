import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  data = this.authService.getData();
  fullUserName : string = '';
  constructor(private authService: AuthService, private router: Router,) {}

  logout() {
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    this.fullUserName = this.data.firstName + ' ' + this.data.lastName;
  }
}
