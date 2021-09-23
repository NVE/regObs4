import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ObservationService } from '../../core/services/observation/observation.service';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { RegistrationViewModel } from '@varsom-regobs-common/regobs-api';
import { PopupInfoService } from '../../core/services/popup-info/popup-info.service';
import { NgDestoryBase } from '../../core/helpers/observable-helper';
import { takeUntil, take } from 'rxjs/operators';
import { RegistrationService } from 'src/app/modules/common-registration/registration.services';

@Component({
  selector: 'app-view-observation',
  templateUrl: './view-observation.page.html',
  styleUrls: ['./view-observation.page.scss']
})
export class ViewObservationPage extends NgDestoryBase implements OnInit {
  obs: RegistrationViewModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private observationService: ObservationService,
    private userSettingService: UserSettingService,
    private popupInfoService: PopupInfoService,
    private ngZone: NgZone,
    private registrationService: RegistrationService,
    private router: Router
  ) {
    super();
  }

  async editRegistration() {
    const reg = await this.registrationService.editExistingRegistrationAndSave(this.obs);
    this.router.navigate(['registration', 'edit', reg.id]);
  }

  async ngOnInit() {
    this.popupInfoService.checkObservationInfoPopup().pipe(takeUntil(this.ngDestroy$)).subscribe();
    const id = parseInt(this.activatedRoute.snapshot.params['id'], 10);
    const userSetting = await this.userSettingService.userSetting$.pipe(take(1)).toPromise();
    const observation = await this.observationService.getObservationById(id, userSetting.appMode, userSetting.language);
    this.ngZone.run(() => {
      this.obs = observation;
    });
  }
}
