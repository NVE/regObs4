import { IonItem, IonIcon, IonList, IonLabel, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { Component, inject, input, model, computed } from '@angular/core';
import { state, trigger, style, transition, animate, stagger, query } from '@angular/animations';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { CustomAnimation, EASE_IN_OUT_BACK, EASE_IN_OUT } from '../../../../core/animations/custom.animation';
import { toSignal } from '@angular/core/rxjs-interop';
import { GeoNameComponent } from '../geo-name/geo-name.component';
import { isArraysEqual } from 'src/app/modules/common-core/helpers/arrays';

const GEOHAZARD_CONFIG = [
  { id: 1, geohazards: [GeoHazard.Snow], icon: '/assets/icon/snow.svg' },
  { id: 2, geohazards: [GeoHazard.Ice], icon: '/assets/icon/ice.svg' },
  { id: 3, geohazards: [GeoHazard.Water, GeoHazard.Soil], icon: '/assets/icon/water_dirt.svg' },
];

@Component({
  selector: 'app-geo-fab',
  templateUrl: './geo-fab.component.html',
  styleUrls: ['./geo-fab.component.scss'],
  animations: [
    trigger('enterAnimationFab', [
      state('x', style({ transform: 'scale3d(0,0,1)', opacity: 0 })),
      state('visible', style({ transform: 'scale3d(1,1,1)', opacity: 1 })),
      transition('x => startAnimated', CustomAnimation.createScaleInTransition(200, 500, EASE_IN_OUT_BACK)),
    ]),
    trigger('enterAnimation', CustomAnimation.createEnterScaleInAnimation(0, 200, EASE_IN_OUT)),
    trigger('listAnimate', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({
              transform: 'translate3d(0, -30px, 0) scale3d(0, 0, 1)',
              opacity: 0,
            }), // initial
            stagger(
              100,
              animate(
                `200ms 0ms ${EASE_IN_OUT}`,
                style({
                  transform: 'translate3d(0, 0, 0) scale3d(1,1,1)',
                  opacity: 1,
                })
              )
            ),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
  imports: [IonIcon, IonItem, IonLabel, IonList, GeoNameComponent, IonFab, IonFabButton],
})
export class GeoFabComponent {
  private userSettingService = inject(UserSettingService);

  readonly isOpen = model(false);
  readonly showLabels = input(true);
  readonly animateOnEnter = input(false);

  animateOnEnterState = 'x';
  private currentGeohazard = toSignal(this.userSettingService.currentGeoHazard$, { initialValue: [GeoHazard.Snow] });
  geohazard = computed(() => {
    const geohazard = this.currentGeohazard();
    const option = GEOHAZARD_CONFIG.find((x) => x.geohazards.includes(geohazard[0]));
    if (!option) {
      throw new Error('Unsupported geohazard');
    }
    return option;
  });

  geohazardOptions = computed(() => {
    const current = this.currentGeohazard();
    return GEOHAZARD_CONFIG.filter(({ geohazards }) => !isArraysEqual(geohazards, current)).map(
      ({ id, geohazards, icon }) => ({
        geohazards,
        id,
        icon,
      })
    );
  });

  toggle() {
    this.isOpen.update((value) => !value);
  }

  setCurrentGeoHazard(geoHazards: GeoHazard[]) {
    this.userSettingService.updateUserSettings({ currentGeoHazard: geoHazards });
    this.isOpen.set(false);
  }
}
