import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../modules/login/services/login.service';
import { Observable } from 'rxjs';
import { LoggedInUser } from '../../../modules/login/models/logged-in-user.model';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  $loggedInUser: Observable<LoggedInUser>;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.$loggedInUser = this.loginService.loggedInUser$;
  }

}
