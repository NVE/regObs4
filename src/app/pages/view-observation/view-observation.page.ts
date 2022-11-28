import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObservationService } from '../../core/services/observation/observation.service';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api/models';
import { PopupInfoService } from '../../core/services/popup-info/popup-info.service';
import { NgDestoryBase } from '../../core/helpers/observable-helper';
import { takeUntil, switchMap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { EditMode } from 'src/app/modules/registration/edit-registration-helper-functions';

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
  ) {
    super();
  }

  ngOnInit() {
    this.popupInfoService.checkObservationInfoPopup().pipe(takeUntil(this.ngDestroy$)).subscribe();
    const id = parseInt(this.activatedRoute.snapshot.params['id'], 10);
    this.registrationViewModel$ = this.userSettingService.userSetting$.pipe(
      switchMap((userSetting) =>
        from(this.observationService.getObservationById(id, userSetting.appMode)))
    );
  }
}
