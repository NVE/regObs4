import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObservationService } from '../../core/services/observation/observation.service';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { RegistrationViewModel } from '../../modules/regobs-api/models';
import { PopupInfoService } from '../../core/services/popup-info/popup-info.service';
import { NgDestoryBase } from '../../core/helpers/observable-helper';
import { takeUntil, take } from 'rxjs/operators';

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
    private ngZone: NgZone) {
    super();
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
