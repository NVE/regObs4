import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegobsAuthService } from '../../services/regobs-auth.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.page.html',
  styleUrls: ['./auth-callback.page.scss'],
})
export class AuthCallbackPage implements OnInit {
  constructor(private regobsAuthService: RegobsAuthService, private router: Router) {}

  ngOnInit() {
    this.regobsAuthService.authorizationCallback(window.location.origin + this.router.url);
  }
}
