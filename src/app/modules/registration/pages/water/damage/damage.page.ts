import { Component, NgZone } from '@angular/core';
import { BasePage } from '../../base.page';
import { KdvKey, RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { KdvElement } from 'src/app/modules/common-regobs-api/models';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { KdvService } from 'src/app/modules/common-registration/registration.services';

const NO_DAMAGE_VISIBLE = 7;

@Component({
  selector: 'app-damage',
  templateUrl: './damage.page.html',
  styleUrls: ['./damage.page.scss']
})
export class DamagePage extends BasePage {
  damageTypes: KdvElement[];
  checked: boolean;

  get isChecked() {
    if (
      !this.registration ||
      !this.registration.request ||
      !this.registration.request.DamageObs ||
      this.registration.request.DamageObs.length === 0
    ) {
      return this.checked;
    }
    return (
      this.registration &&
      this.registration.request.DamageObs.filter(
        (x) => x.DamageTypeTID !== NO_DAMAGE_VISIBLE
      ).length > 0
    );
  }

  set isChecked(val: boolean) {
    this.checked = val;
    if (val === false) {
      this.registration.request.DamageObs = [
        {
          DamageTypeTID: NO_DAMAGE_VISIBLE
        }
      ];
    } else {
      this.registration.request.DamageObs = this.registration.request.DamageObs.filter(
        (x) => x.DamageTypeTID !== NO_DAMAGE_VISIBLE
      );
    }
  }

  private kdvSubscription: Subscription;

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
    private kdvService: KdvService,
    private ngZone: NgZone
  ) {
    super(RegistrationTid.DamageObs, basePageService, activatedRoute);
  }

  onInit() {
    const geoHazardName = GeoHazard[this.registration.geoHazard];
    this.kdvSubscription = this.kdvService
      .getKdvRepositoryByKeyObservable(`${geoHazardName}_DamageTypeKDV` as KdvKey)
      .pipe(map((val) => val.filter((x) => x.Id !== NO_DAMAGE_VISIBLE)))
      .subscribe((kdvElements) => {
        this.ngZone.run(() => {
          this.damageTypes = kdvElements;
        });
      });
  }

  onBeforeLeave() {
    if (this.kdvSubscription) {
      this.kdvSubscription.unsubscribe();
    }
  }
}
