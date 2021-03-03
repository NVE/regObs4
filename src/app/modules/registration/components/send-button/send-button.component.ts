import { Component, OnInit, Input, NgZone, OnDestroy } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { IRegistration } from '@varsom-regobs-common/registration';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { take, takeUntil } from 'rxjs/operators';
import { RegobsAuthService } from '../../../auth/services/regobs-auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-send-button',
  templateUrl: './send-button.component.html',
  styleUrls: ['./send-button.component.scss']
})
export class SendButtonComponent implements OnInit, OnDestroy {
  @Input() registration: IRegistration;

  get isEmpty(): boolean {
    return this.registrationService.isRegistrationEmpty(this.registration);
  }

  get isDisabled(): boolean {
    return this.isEmpty || this.isSending || this.isLoggingIn;
  }

  isSending = false;
  isLoggingIn = false;

  private ngDestroy$ = new Subject<void>();

  constructor(
    private registrationService: RegistrationService,
    private alertController: AlertController,
    private userSettingService: UserSettingService,
    private translateService: TranslateService,
    private ngZone: NgZone,
    private navController: NavController,
    private regobsAuthService: RegobsAuthService
  ) {}

  ngOnInit(): void {
    this.isSending = false;
    this.isLoggingIn = false;
    this.regobsAuthService.isLoggingIn$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((val) => {
        this.ngZone.run(() => {
          this.isLoggingIn = val;
        });
      });
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  send(): void {
    if (!this.isSending) {
      this.isSending = true;
      setTimeout(async () => {
        try {
          const userSettings = await this.userSettingService.userSetting$
            .pipe(take(1))
            .toPromise();
          await this.registrationService.sendRegistration(
            userSettings.appMode,
            this.registration
          );
        } finally {
          this.ngZone.run(() => {
            this.isSending = false;
          });
        }
      }, 200);
    }
  }

  async delete(): Promise<void> {
    const userSettings = await this.userSettingService.userSetting$
      .pipe(take(1))
      .toPromise();
    const translations = await this.translateService
      .get([
        'REGISTRATION.DELETE',
        'REGISTRATION.DELETE_CONFIRM',
        'ALERT.OK',
        'ALERT.CANCEL'
      ])
      .toPromise();
    const alert = await this.alertController.create({
      header: translations['REGISTRATION.DELETE'],
      message: translations['REGISTRATION.DELETE_CONFIRM'],
      buttons: [
        {
          text: translations['ALERT.CANCEL'],
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: translations['ALERT.OK'],
          handler: async () => {
            await this.registrationService.deleteRegistrationById(
              userSettings.appMode,
              this.registration.id
            );
            this.navController.navigateRoot('');
          }
        }
      ]
    });
    await alert.present();
  }
}
