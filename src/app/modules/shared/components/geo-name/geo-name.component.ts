import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { GeoHelperService } from '../../services/geo-helper/geo-helper.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-geo-name',
  template: '{{ name() }}',
  styleUrls: ['./geo-name.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeoNameComponent {
  private geoHelperService = inject(GeoHelperService);

  readonly geoHazards = input.required<GeoHazard[]>();

  private nameResource = rxResource({
    request: () => this.geoHazards(),
    loader: ({ request: geohazards }) => this.geoHelperService.getName(geohazards),
  });

  name = this.nameResource.value.asReadonly();
}
