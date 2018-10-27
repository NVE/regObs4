import { Component, OnInit } from '@angular/core';
import { BasePage } from '../../base.page';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { RegistrationService } from '../../../services/registration.service';
import { RadioGroup } from '@ionic/angular';
import { KdvService } from '../../../../../core/services/kdv/kdv.service';
import { UserSettingService } from '../../../../../core/services/user-setting/user-setting.service';
import { GeoHazard } from '../../../../../core/models/geo-hazard.enum';
import { KdvElement, PictureRequestDto } from '../../../../regobs-api/models';

const NO_DAMAGE_VISIBLE = 7;

@Component({
  selector: 'app-damage',
  templateUrl: './damage.page.html',
  styleUrls: ['./damage.page.scss'],
})
export class DamagePage extends BasePage {

  isDamages: boolean;
  damages: Array<{ name: string, id: number, checked: boolean, images: PictureRequestDto[] }>;
  damageTypes: KdvElement[];

  constructor(
    registrationService: RegistrationService,
    private kdvService: KdvService,
    private userSettingService: UserSettingService,
  ) {
    super(RegistrationTid.DamageObs, registrationService);
  }

  async onInit() {
    const userSetting = await this.userSettingService.getUserSettings();
    this.damageTypes = await this.kdvService.getKdvElements(userSetting.language, userSetting.appMode,
      `${GeoHazard[userSetting.currentGeoHazard]}_DamageTypeKDV`);
    this.updateCheckboxes();
  }

  onReset() {
    this.updateCheckboxes();
  }

  updateCheckboxes() {
    this.damages = this.damageTypes.filter((damageType) => damageType.Id !== NO_DAMAGE_VISIBLE)
      .map((damageType) => {
        const damageObs = this.registration.DamageObs.find((x) => x.DamageTypeTID === damageType.Id);
        return {
          name: damageType.Name,
          id: damageType.Id,
          checked: !!damageObs,
          images: damageObs ? damageObs.Pictures : [],
        };
      });
    if (this.registration.DamageObs.length > 0) {
      const firstDamageObs = this.registration.DamageObs[0];
      if (firstDamageObs.DamageTypeTID === NO_DAMAGE_VISIBLE) {
        this.isDamages = false;
      } else {
        this.isDamages = true;
      }
    }
  }

  onBeforeLeave() {
  }

  setDamageSelected(value: boolean) {
    this.isDamages = value;
    if (this.isDamages === false) {
      this.registration.DamageObs = [
        {
          DamageTypeTID: NO_DAMAGE_VISIBLE
        }
      ];
    } else {
      this.registration.DamageObs = [];
    }
  }

  onChange(event: Event) {
    const radioGroup: RadioGroup = <any>event.target;
    this.setDamageSelected(radioGroup.value === 'false' ? false : true);
  }

  toggleDamageType(id: number) {
    const damageType = this.damages.find((x) => x.id === id);
    damageType.checked = !damageType.checked;
    this.damageTypeChanged();
  }

  damageTypeChanged() {
    for (const damageType of this.damages) {
      const reg = this.registration.DamageObs.find((x) => x.DamageTypeTID === damageType.id);
      if (damageType.checked && !reg) {
        this.registration.DamageObs.push({ DamageTypeTID: damageType.id });
      }
      if (!damageType.checked && reg) {
        this.registration.DamageObs = this.registration.DamageObs.filter((x) => x.DamageTypeTID !==
          damageType.id);
      }
    }
  }

}
