import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ObservationService } from '../../core/services/observation/observation.service';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { RegistrationViewModel } from '@varsom-regobs-common/regobs-api';
import { PopupInfoService } from '../../core/services/popup-info/popup-info.service';
import { NgDestoryBase } from '../../core/helpers/observable-helper';
import { takeUntil, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { RegistrationService } from 'src/app/modules/common-registration/registration.services';
import { from, Observable } from 'rxjs';
import { EditMode, getObserverEditCheckObservable } from 'src/app/modules/registration/edit-registration-helper-functions';
import { RegobsAuthService } from 'src/app/modules/auth/services/regobs-auth.service';

@Component({
  selector: 'app-view-observation',
  templateUrl: './view-observation.page.html',
  styleUrls: ['./view-observation.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewObservationPage extends NgDestoryBase implements OnInit {
  editMode$: Observable<EditMode>;
  registrationViewModel$: Observable<RegistrationViewModel>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private observationService: ObservationService,
    private userSettingService: UserSettingService,
    private popupInfoService: PopupInfoService,
    private registrationService: RegistrationService,
    private router: Router,
    private regobsAuthService: RegobsAuthService
  ) {
    super();
  }

  async editRegistration(registration: RegistrationViewModel) {
    const reg = await this.registrationService.editExistingRegistrationAndSave(registration);
    this.router.navigate(['registration', 'edit', reg.id]);
  }

  ngOnInit() {
    this.popupInfoService.checkObservationInfoPopup().pipe(takeUntil(this.ngDestroy$)).subscribe();
    const id = parseInt(this.activatedRoute.snapshot.params['id'], 10);
    this.registrationViewModel$ = this.userSettingService.userSetting$.pipe(
      switchMap((userSetting) => from(this.observationService.getObservationById(id, userSetting.appMode, userSetting.language)))
    );
    this.editMode$ = this.createEditMode$();
  }

  private createEditMode$(): Observable<EditMode> {
    return this.registrationViewModel$.pipe(
      withLatestFrom(this.regobsAuthService.myPageData$),
      switchMap(([reg, observer]) => getObserverEditCheckObservable(reg, observer))
    );
  }
}
