import { IonMenuButton } from '@ionic/angular/standalone';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeoHazard, LangKey } from 'src/app/modules/common-core/models';
import { BreakpointService } from '../../../../core/services/breakpoint.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { NgIf, AsyncPipe, LowerCasePipe } from '@angular/common';
import { GeoNameComponent } from '../../../shared/components/geo-name/geo-name.component';
import { CheckDaysOrWeeksBackComponent } from '../check-days-or-weeks-back/check-days-or-weeks-back.component';
import { TranslatePipe } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-show-filter-criteria',
  templateUrl: './show-filter-criteria.component.html',
  styleUrls: ['./show-filter-criteria.component.scss'],
  imports: [
    AsyncPipe,
    CheckDaysOrWeeksBackComponent,
    GeoNameComponent,
    IonMenuButton,
    LowerCasePipe,
    NgIf,
    TranslatePipe,
  ],
})
export class ShowFilterCriteriaComponent {
  userSettingService = inject(UserSettingService);
  private breakpointService = inject(BreakpointService);

  daysBack = toSignal(this.userSettingService.daysBackForCurrentGeoHazard$, { initialValue: 1 });
  isDesktop = toSignal(this.breakpointService.isDesktopView());
  currentGeoHazard = toSignal(this.userSettingService.currentGeoHazard$);
  language = toSignal(this.userSettingService.language$, { initialValue: LangKey.nb });
  showObservations = toSignal(this.userSettingService.showObservations$, { initialValue: false });
}
