import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RegobsAuthService } from '../../../auth/services/regobs-auth.service';
import { LoggedInUser } from '../../../login/models/logged-in-user.model';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  $loggedInUser: Observable<LoggedInUser>;

  constructor(private regobsauthService: RegobsAuthService) { }

  ngOnInit() {
    this.$loggedInUser = this.regobsauthService.loggedInUser$;
  }

  login() {
    this.regobsauthService.signIn();
  }

}
