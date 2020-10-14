import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthActions, AuthObserver, AuthService, IAuthAction } from 'ionic-appauth';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.page.html',
  styleUrls: ['./auth-callback.page.scss'],
})
export class AuthCallbackPage implements OnInit {

  observer: AuthObserver;

  constructor(
    private auth: AuthService,
    private navCtrl: NavController,
    private router: Router
  ) { }

  ngOnInit() {
    this.observer = this.auth.addActionListener((action) => this.postCallback(action));
    this.auth.authorizationCallback(window.location.origin + this.router.url);
  }

  ngOnDestroy() {
    this.auth.removeActionObserver(this.observer);
  }

  postCallback(action: IAuthAction) {
    if (action.action === AuthActions.SignInSuccess) {
      this.navCtrl.navigateRoot('');
    }

    if (action.action === AuthActions.SignInFailed) {
      this.navCtrl.navigateRoot('');
    }
  }

}
