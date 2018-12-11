import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggedInUser } from '../../models/logged-in-user.model';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loggedInUser: LoggedInUser;

  private subscription: Subscription;

  constructor(
    private loginService: LoginService,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.subscription = this.loginService.loggedInUser$.subscribe((loggedInUser) => {
      this.ngZone.run(() => {
        this.loggedInUser = loggedInUser;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  isLoggedIn(loggedInUser: LoggedInUser) {
    return loggedInUser && loggedInUser.isLoggedIn;
  }

  logout() {
    return this.loginService.logout();
  }

}
