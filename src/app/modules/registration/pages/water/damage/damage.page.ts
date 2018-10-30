import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BasePage } from '../../base.page';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { RegistrationService } from '../../../services/registration.service';
import { RadioGroup } from '@ionic/angular';
import { KdvService } from '../../../../../core/services/kdv/kdv.service';
import { UserSettingService } from '../../../../../core/services/user-setting/user-setting.service';
import { GeoHazard } from '../../../../../core/models/geo-hazard.enum';
import { KdvElement, PictureRequestDto } from '../../../../regobs-api/models';
import { ActivatedRoute } from '@angular/router';

const NO_DAMAGE_VISIBLE = 7;

@Component({
  selector: 'app-damage',
  templateUrl: './damage.page.html',
  styleUrls: ['./damage.page.scss'],
})
export class DamagePage extends BasePage {
  damageTypes: KdvElement[];
  checked: boolean;
  onChangeFunc: (bool) => void;

  constructor(
    registrationService: RegistrationService,
    actvatedRoute: ActivatedRoute,
    changeDetectorRef: ChangeDetectorRef,
    private kdvService: KdvService,
    private userSettingService: UserSettingService,
  ) {
    super(RegistrationTid.DamageObs, registrationService, actvatedRoute, changeDetectorRef);
  }

  async onInit() {
    const userSetting = await this.userSettingService.getUserSettings();
    this.damageTypes = (await this.kdvService.getKdvElements(userSetting.language, userSetting.appMode,
      `${GeoHazard[userSetting.currentGeoHazard]}_DamageTypeKDV`))
      .filter((x) => x.Id !== NO_DAMAGE_VISIBLE);
    if (this.registration.DamageObs.length > 0) {
      this.checked = this.registration.DamageObs.filter((x) => x.DamageTypeTID !== NO_DAMAGE_VISIBLE).length > 0;
    }
    this.onChangeFunc = this.checkedChanged;
    // NOTE: There is a bug in current framework so I cannot bind radio group
    // with ngModel. When that is fixed, the onChange logic can be removed
    // and ngModel binding can be used instead...
  }

  onReset() {
    this.checked = undefined;
  }

  onBeforeLeave() {
  }

  onChange(event: Event) {
    const radioGroup: RadioGroup = <any>event.target;
    if (this.onChangeFunc) {
      this.onChangeFunc(radioGroup.value);
    }
  }

  checkedChanged(value: boolean) {
    this.checked = value;
    if (value) {
      this.registration.DamageObs = this.registration.DamageObs.filter((x) => x.DamageTypeTID !== NO_DAMAGE_VISIBLE);
    } else {
      this.registration.DamageObs = [
        {
          DamageTypeTID: NO_DAMAGE_VISIBLE
        }
      ];
    }
  }
}
