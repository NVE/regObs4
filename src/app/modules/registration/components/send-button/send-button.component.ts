import { Component, OnInit, Input, NgZone, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { IRegistration } from '@varsom-regobs-common/registration';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { take, takeUntil } from 'rxjs/operators';
import { RegobsAuthService } from '../../../auth/services/regobs-auth.service';
import { Subject } from 'rxjs';
import { RegistrationService as CommonRegistrationService } from '@varsom-regobs-common/registration';
import { SmartChanges } from 'src/app/core/helpers/simple-changes.helper';

@Component({
  selector: 'app-send-button',
  templateUrl: './send-button.component.html',
  styleUrls: ['./send-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SendButtonComponent implements OnInit, OnDestroy, OnChanges {
  @Input() registration: IRegistration;

  // get isEmpty(): boolean {
  //   return this.registrationService.isRegistrationEmpty(this.registration);
  // }
  isEmpty: boolean;

  get isDisabled(): boolean {
    // TODO: Hvorfor disabled hvis man holder på å logge inn?
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
    private navController: NavController,
    private regobsAuthService: RegobsAuthService,
    private commonRegistrationService: CommonRegistrationService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.isSending = false;
    this.isLoggingIn = false;
    this.regobsAuthService.isLoggingIn$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((val) => {
        this.ngZone.run(() => {
          this.isLoggingIn = val;
          this.cdr.detectChanges();
        });
      });
  }

  ngOnChanges(changes: SimpleChanges & SmartChanges<this>): void {
    if (changes.registration?.currentValue) {
      this.commonRegistrationService.isEmpty(changes.registration.currentValue).subscribe((empty) => {
        this.isEmpty = empty;
        this.cdr.detectChanges();
      });
    }
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  async send(): Promise<void> {
    if (!this.isSending) {
      this.isSending = true;
      this.cdr.detectChanges();
      try {
        const userSettings = await this.userSettingService.userSetting$
          .pipe(take(1))
          .toPromise();
        await this.registrationService.sendRegistration(
          userSettings.appMode,
          this.registration
        );
      } finally {
        this.isSending = false;
        this.cdr.detectChanges();
      }
    }
  }

  async delete(): Promise<void> {

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
          handler: () => {
            this.commonRegistrationService.deleteRegistrationFromOfflineStorage(
              this.registration.id
            ).subscribe(() => {
              this.navController.navigateRoot('');
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
