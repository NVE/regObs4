import {
  IonToolbar,
  IonContent,
  IonCardHeader,
  IonBackButton,
  IonCardContent,
  IonIcon,
  IonCardTitle,
  IonTitle,
  IonCard,
  IonHeader,
  IonButton,
  IonButtons,
  IonChip,
  IonLabel,
} from '@ionic/angular/standalone';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  input,
  numberAttribute,
  computed,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { PopupInfoService } from '../../core/services/popup-info/popup-info.service';
import { NgDestoryBase } from '../../core/helpers/observable-helper';
import { takeUntil, map, switchMap } from 'rxjs/operators';
import { Subject, merge } from 'rxjs';
import { RegistrationService, RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { RegobsAuthService } from 'src/app/modules/auth/services/regobs-auth.service';
import { HeaderColorDirective } from '../../modules/shared/directives/header-color/header-color.directive';
import { NgIf, AsyncPipe, NgComponentOutlet, DatePipe, DecimalPipe } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { personCircle } from 'ionicons/icons';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import {
  getLocation,
  getRegistrationViews,
  ObservationComponent,
} from 'src/app/components/observation/observation/observation.component';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { StaticMapImageComponent } from '../../modules/static-map-image/static-map-image.component';
import { KeyValueComponent } from '../../components/observation/key-value/key-value.component';
import { LangKey } from 'src/app/modules/common-core/models';
import { GridImageComponent } from '../observation-list/image-list/grid-image.component';

@Component({
  selector: 'app-view-observation',
  templateUrl: './view-observation.page.html',
  styleUrls: ['../../components/observation/common-styles.css', './view-observation.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonLabel,
    IonChip,
    AsyncPipe,
    HeaderColorDirective,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonTitle,
    IonToolbar,
    NgIf,
    TranslatePipe,
    ObservationComponent,
    NgComponentOutlet,
    StaticMapImageComponent,
    DatePipe,
    KeyValueComponent,
    DecimalPipe,
    GridImageComponent,
  ],
})
export class ViewObservationPage extends NgDestoryBase implements OnInit {
  private popupInfoService = inject(PopupInfoService);
  private userSettingService = inject(UserSettingService);
  private registrationService = inject(RegistrationService);
  private authService = inject(RegobsAuthService);
  private router = inject(Router);

  readonly regId = input.required({ transform: numberAttribute, alias: 'id' });

  lang = inject(TranslateService).currentLang;
  // language = toSignal(this.userSettingService.language$, { initialValue: LangKey.nb });

  registration = rxResource({
    params: () => ({ regId: this.regId() }),
    stream: ({ params }) => this.getRegistration$(params.regId),
  });

  registrationViews = computed(() =>
    this.registration.hasValue() ? getRegistrationViews(this.registration.value(), true) : []
  );

  errorMessage = computed(() => {
    const err = this.registration.error();
    if (err instanceof Error) {
      return err.message;
    }
    return null;
  });

  private _isLoggingIn = new Subject<boolean>();
  loggedInUserEmail = toSignal(
    this.authService.loggedInUser$.pipe(map((user) => (user.isLoggedIn ? user.email : null)))
  );
  isLoggingIn$ = merge(this._isLoggingIn, this.authService.isLoggingIn$);

  constructor() {
    super();
    addIcons({ personCircle });
  }

  getLocation(obs: RegistrationViewModel) {
    return getLocation(obs);
  }

  goToMyPage() {
    // we need to store curLocation in case user logs out and login on the /login page
    // then we navigate based on prevUrl in localStorage otherwise back button will navigate to
    // authcalback site and hang the app
    const curLocation = this.router.url;
    localStorage.setItem('prevUrl', curLocation);

    this.router.navigateByUrl('/login');
  }

  async signIn() {
    this._isLoggingIn.next(true);
    await this.authService.signIn();
  }

  private getRegistration$(regId: number) {
    return this.userSettingService.language$.pipe(
      switchMap((langKey) => this.registrationService.RegistrationGet({ regId, langKey }))
    );
  }

  ngOnInit() {
    this.isLoggingIn$ = merge(this._isLoggingIn, this.authService.isLoggingIn$);

    this.popupInfoService.checkObservationInfoPopup().pipe(takeUntil(this.ngDestroy$)).subscribe();
  }
}
