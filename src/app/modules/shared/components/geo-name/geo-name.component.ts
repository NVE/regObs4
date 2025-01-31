import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { switchMap } from 'rxjs';
import { GeoHelperService } from '../../services/geo-helper/geo-helper.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-geo-name',
  template: '{{ name() }}',
  styleUrls: ['./geo-name.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeoNameComponent {
  private geoHelperService = inject(GeoHelperService);
  private userSettingsService = inject(UserSettingService);

  readonly geoHazards = input.required<GeoHazard[]>();

  private nameResource = rxResource({
    request: () => this.geoHazards(),
    loader: ({ request: geohazards }) =>
      this.userSettingsService.language$.pipe(switchMap(() => this.geoHelperService.getName(geohazards))),
  });

  name = this.nameResource.value.asReadonly();
}
