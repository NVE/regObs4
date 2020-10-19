import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'ionic-appauth';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.page.html',
  styleUrls: ['./auth-callback.page.scss'],
})
export class AuthCallbackPage implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.authorizationCallback(window.location.origin + this.router.url);
  }
}
