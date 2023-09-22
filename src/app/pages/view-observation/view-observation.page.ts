import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api/models';
import { PopupInfoService } from '../../core/services/popup-info/popup-info.service';
import { NgDestoryBase } from '../../core/helpers/observable-helper';
import { takeUntil, map, catchError, filter } from 'rxjs/operators';
import { Observable, Subject, merge, of } from 'rxjs';
import { EditMode } from 'src/app/modules/registration/edit-registration-helper-functions';
import { SearchService } from 'src/app/modules/common-regobs-api';
import { RegobsAuthService } from 'src/app/modules/auth/services/regobs-auth.service';

interface RegistrationResult {
  reg?: RegistrationViewModel;
  err?: Error;
}

@Component({
  selector: 'app-view-observation',
  templateUrl: './view-observation.page.html',
  styleUrls: ['./view-observation.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewObservationPage extends NgDestoryBase implements OnInit {
  editMode$: Observable<EditMode>;
  registrationViewModel$: Observable<RegistrationResult>;

  loggedInUser$: Observable<string>;
  isLoggingIn$: Observable<boolean>;
  private _isLoggingIn = new Subject<boolean>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private popupInfoService: PopupInfoService,
    private searchService: SearchService,
    private authService: RegobsAuthService,
    private router: Router
  ) {
    super();
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

  ngOnInit() {
    this.isLoggingIn$ = merge(this._isLoggingIn, this.authService.isLoggingIn$);

    this.loggedInUser$ = this.authService.loggedInUser$.pipe(
      filter((user) => user.isLoggedIn),
      map((user) => user.email)
    );

    this.popupInfoService.checkObservationInfoPopup().pipe(takeUntil(this.ngDestroy$)).subscribe();
    const id = this.activatedRoute.snapshot.params['id'];
    const regId = parseInt(id, 10);

    if (isNaN(regId)) {
      this.registrationViewModel$ = of({ err: new Error(`Invalid registration id: "${id}"`) });
    } else {
      this.registrationViewModel$ = this.searchService
        .SearchSearch({
          RegId: regId,
        })
        .pipe(
          map((result) => ({ reg: result[0] })),
          catchError((err) => of({ err }))
        );
    }
  }
}
