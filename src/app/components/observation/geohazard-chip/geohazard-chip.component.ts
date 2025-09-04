import { ChangeDetectionStrategy, Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, input } from '@angular/core';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { getIconForGeohazards } from 'src/app/modules/shared/components/geo-icon/get-geo-icon';
import { IonChip, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { GeoHelperService } from 'src/app/modules/shared/services/geo-helper/geo-helper.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-geohazard-chip',
  template: `
    <ion-chip color="primary" disabled>
      <ion-icon [src]="geoIcon()"></ion-icon>
      <ion-label>{{ geoName() }}</ion-label>
    </ion-chip>
  `,
  styles: [
    `
      ion-chip ion-label + ion-label {
        margin-left: 8px;
      }

      ion-chip.chip-disabled {
        opacity: 1;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonChip, IonIcon, IonLabel],
})
/** Viser en chip med ikon og navn på aktuell naturfare for valgt registrering */
export class GeohazardChipComponent {
  readonly registration = input.required<RegistrationViewModel>();
  private helper = inject(GeoHelperService);

  geoIcon = computed(() => getIconForGeohazards([this.registration().GeoHazardTID]));
  geoName = computed(() => this.geoNameResource.value());

  private geoNameResource = rxResource({
    stream: () => this.helper.getName([this.registration().GeoHazardTID]),
  });
}
