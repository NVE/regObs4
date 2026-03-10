import { IonContent, IonSpinner } from '@ionic/angular/standalone';
import { Component, OnInit, inject , ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { RegobsAuthService } from '../../services/regobs-auth.service';

@Component({
  selector: 'app-auth-callback',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './auth-callback.page.html',
  styleUrls: ['./auth-callback.page.scss'],
  imports: [IonContent, IonSpinner],
})
export class AuthCallbackPage implements OnInit {
  private regobsAuthService = inject(RegobsAuthService);
  private router = inject(Router);

  ngOnInit() {
    this.regobsAuthService.authorizationCallback(window.location.origin + this.router.url);
  }
}
