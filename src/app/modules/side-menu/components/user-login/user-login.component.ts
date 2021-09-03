import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RegobsAuthService } from '../../../auth/services/regobs-auth.service';
import { LoggedInUser } from '../../../login/models/logged-in-user.model';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit, OnDestroy {
  loggedInUser: LoggedInUser = { isLoggedIn: false };
  private ngDestroy$ = new Subject<void>();
  isLoggingIn = false;

  constructor(
    private regobsauthService: RegobsAuthService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.regobsauthService.loggedInUser$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((val) => {
        this.ngZone.run(() => {
          this.loggedInUser = val;
        });
      });
    this.regobsauthService.isLoggingIn$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((val) => {
        this.ngZone.run(() => {
          this.isLoggingIn = val;
        });
      });
  }

  login(): void {
    this.regobsauthService.signIn();
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
