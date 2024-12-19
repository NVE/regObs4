import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SupportTile } from 'src/app/core/models/support-tile.model';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { setObservableTimeout } from '../../../../../../core/helpers/observable-helper';
import { NgIf, AsyncPipe } from '@angular/common';
import { SteepnessCommonLegendComponent } from '../steepness-common-legend/steepness-common-legend.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-steepness-legend',
  templateUrl: './steepness-legend.component.html',
  styleUrls: ['./steepness-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, SteepnessCommonLegendComponent, AsyncPipe, TranslatePipe],
})
export class SteepnessLegendComponent {
  private userSettingService = inject(UserSettingService);

  readonly supportTilesWithSubTiles$: Observable<SupportTile[]>;

  constructor() {
    this.supportTilesWithSubTiles$ = this.userSettingService.supportTilesWithSubTiles$.pipe(setObservableTimeout());
  }

  isOutletsActive(supportTiles: SupportTile[]): boolean {
    const steepness = supportTiles.find((t) => t.name == 'steepness');
    if (steepness && steepness.subTile && steepness.subTile.name == 'steepness-outlet') {
      return steepness.subTile.enabled;
    }
    return false;
  }
}
