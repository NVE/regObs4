import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObservationService } from '../../core/services/observation/observation.service';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { RegistrationViewModel } from '../../modules/regobs-api/models';

@Component({
  selector: 'app-view-observation',
  templateUrl: './view-observation.page.html',
  styleUrls: ['./view-observation.page.scss'],
})
export class ViewObservationPage implements OnInit {

  obs: RegistrationViewModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private observationService: ObservationService,
    private userSettingService: UserSettingService,
    private ngZone: NgZone) { }

  async ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.params['id'], 10);
    const userSetting = await this.userSettingService.getUserSettings();
    const observation = await this.observationService.getObservationById(id, userSetting.appMode, userSetting.language);
    this.ngZone.run(() => {
      this.obs = observation;
    });
  }

}
