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
} from '@ionic/angular/standalone';
import { Component, OnInit, ChangeDetectionStrategy, inject, input, numberAttribute, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api/models';
import { PopupInfoService } from '../../core/services/popup-info/popup-info.service';
import { NgDestoryBase } from '../../core/helpers/observable-helper';
import { takeUntil, map, catchError, filter } from 'rxjs/operators';
import { Observable, Subject, merge, of } from 'rxjs';
import { EditMode } from 'src/app/modules/registration/edit-registration-helper-functions';
import { SearchService } from 'src/app/modules/common-regobs-api';
import { RegobsAuthService } from 'src/app/modules/auth/services/regobs-auth.service';
import { HeaderColorDirective } from '../../modules/shared/directives/header-color/header-color.directive';
import { NgIf, AsyncPipe } from '@angular/common';
import { ObservationListCardComponent } from '../../components/observation/observation-list-card/observation-list-card.component';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { personCircle } from 'ionicons/icons';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

interface RegistrationResult {
  reg?: RegistrationViewModel;
  err?: Error;
}

@Component({
  selector: 'app-view-observation',
  templateUrl: './view-observation.page.html',
  styleUrls: ['./view-observation.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
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
    ObservationListCardComponent,
    TranslatePipe,
  ],
})
export class ViewObservationPage extends NgDestoryBase implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private popupInfoService = inject(PopupInfoService);
  private searchService = inject(SearchService);
  private authService = inject(RegobsAuthService);
  private router = inject(Router);

  readonly regId = input.required({ transform: numberAttribute, alias: 'id' });

  registration = rxResource({
    request: () => ({ regId: this.regId() }),
    loader: ({ request }) => this.getRegistration$(request.regId),
  });
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
    return this.searchService
      .SearchSearch({
        RegId: regId,
      })
      .pipe(map((result) => result[0]));
  }

  ngOnInit() {
    this.isLoggingIn$ = merge(this._isLoggingIn, this.authService.isLoggingIn$);

    this.popupInfoService.checkObservationInfoPopup().pipe(takeUntil(this.ngDestroy$)).subscribe();
  }
}
