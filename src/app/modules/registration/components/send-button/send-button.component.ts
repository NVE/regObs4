import { Component, OnInit, Input, NgZone, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { RegobsAuthService } from '../../../auth/services/regobs-auth.service';
import { Subject } from 'rxjs';
import { SmartChanges } from 'src/app/core/helpers/simple-changes.helper';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { DraftToRegistrationService } from 'src/app/core/services/draft/draft-to-registration.service';

@Component({
  selector: 'app-send-button',
  templateUrl: './send-button.component.html',
  styleUrls: ['./send-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SendButtonComponent implements OnInit, OnDestroy, OnChanges {
  @Input() draft: RegistrationDraft;

  isEmpty = true;

  get isDisabled(): boolean {
    return this.isEmpty || this.isSending || this.isLoggingIn;
  }

  isSending = false;
  isLoggingIn = false;

  private ngDestroy$ = new Subject<void>();

  constructor(
    private draftService: DraftRepositoryService,
    private alertController: AlertController,
    private translateService: TranslateService,
    private navController: NavController,
    private regobsAuthService: RegobsAuthService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private draftToRegistrationService: DraftToRegistrationService
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
    if (changes.draft?.currentValue) {
      this.draftService.isDraftEmpty(changes.draft.currentValue).then((isEmpty) => {
        this.isEmpty = isEmpty;
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
        // Redirect user to log in if not authenticated
        const loggedInUser = await this.regobsAuthService.getLoggedInUserAsPromise();
        if (!loggedInUser.isLoggedIn) {
          this.regobsAuthService.signIn();
          return;
        }

        this.draftToRegistrationService.markDraftAsReadyToSubmit(this.draft);

        // Navigate to my observations
        this.navController.navigateRoot('my-observations');
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
            this.draftService.delete(this.draft.uuid).then(() => {
              this.navController.navigateRoot('');
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
