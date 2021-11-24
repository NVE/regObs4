import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { SupportTile } from 'src/app/core/models/support-tile.model';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';import { SupportMapInfoPage } from 'src/app/modules/map/pages/support-map-info/support-map-info.page';
import {
  setObservableTimeout
} from '../../../../../../core/helpers/observable-helper';

@Component({
  selector: 'app-steepness-legend',
  templateUrl: './steepness-legend.component.html',
  styleUrls: ['./steepness-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SteepnessLegendComponent {
  readonly supportTilesWithSubTiles$: Observable<SupportTile[]>;

  constructor(
    private userSettingService: UserSettingService,
  ) {
    this.supportTilesWithSubTiles$ = this.userSettingService.supportTilesWithSubTiles$.pipe(
      setObservableTimeout()
    );
  }

  isOutletsActive(supportTiles: SupportTile[]): boolean {
    let steepness = supportTiles.find((t) => t.name == "steepness")
    if (steepness && steepness.subTile && steepness.subTile.name == "steepness-outlet") {
      return steepness.subTile.enabled;
    }
    return false;
  }
}