import { Component, Input, OnChanges } from '@angular/core';
import { GeoHazard, LangKey } from 'src/app/modules/common-core/models';
import { Observable, switchMap } from 'rxjs';
import { GeoHelperService } from '../../services/geo-helper/geo-helper.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';

@Component({
  selector: 'app-geo-name',
  templateUrl: './geo-name.component.html',
  styleUrls: ['./geo-name.component.scss'],
})
export class GeoNameComponent implements OnChanges {
  @Input() geoHazards: GeoHazard[];

  name$: Observable<string>;
  language$: Observable<LangKey>;

  constructor(private geoHelperService: GeoHelperService, private userSettingsService: UserSettingService) {}

  ngOnChanges(): void {
    this.name$ = this.userSettingsService.language$.pipe(
      switchMap(() => this.geoHelperService.getName(this.geoHazards))
    );
  }
}
