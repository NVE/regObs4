import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthObserver, AuthService } from 'ionic-appauth';
import { RegobsAuthService, RETURN_URL_KEY } from '../../services/regobs-auth.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.page.html',
  styleUrls: ['./auth-callback.page.scss'],
})
export class AuthCallbackPage implements OnInit {

  observer: AuthObserver;

  constructor(
    private auth: AuthService,
    private regobsAuthService: RegobsAuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.observer = this.auth.addActionListener((action) => this.regobsAuthService.onSignInCallback(action));
    this.auth.authorizationCallback(window.location.origin + this.router.url);
  }

  ngOnDestroy() {
    this.auth.removeActionObserver(this.observer);
  }
}
