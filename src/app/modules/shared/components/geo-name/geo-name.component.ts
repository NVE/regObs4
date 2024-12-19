import { Component, Input, OnChanges, inject } from '@angular/core';
import { GeoHazard, LangKey } from 'src/app/modules/common-core/models';
import { Observable, switchMap } from 'rxjs';
import { GeoHelperService } from '../../services/geo-helper/geo-helper.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-geo-name',
  template: '{{ name$ | async }}',
  styleUrls: ['./geo-name.component.scss'],
  imports: [AsyncPipe],
})
export class GeoNameComponent implements OnChanges {
  private geoHelperService = inject(GeoHelperService);
  private userSettingsService = inject(UserSettingService);

  @Input() geoHazards: GeoHazard[];

  name$: Observable<string>;
  language$: Observable<LangKey>;

  ngOnChanges(): void {
    this.name$ = this.userSettingsService.language$.pipe(
      switchMap(() => this.geoHelperService.getName(this.geoHazards))
    );
  }
}
