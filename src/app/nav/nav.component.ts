import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  private mostrarMenu = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.mostrarMenu.subscribe(
      value => this.mostrarMenu = value
    );
  }

  fazerLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
