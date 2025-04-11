import { Component, computed, inject } from '@angular/core';
import { IonBadge, IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import { combineLatest, Observable } from 'rxjs';
import { FullscreenService } from '../../core/services/fullscreen/fullscreen.service';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { GeoHazard, LangKey } from '../../modules/common-core/models';
import { SearchCriteriaService } from '../../core/services/search-criteria/search-criteria.service';
import { WarningService } from '../../core/services/warning/warning.service';
import { TABS, TabsService } from './tabs.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { mapOutline, list, warning, openOutline } from 'ionicons/icons';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointService } from 'src/app/core/services/breakpoint.service';
import { Capacitor } from '@capacitor/core';
import { settings } from 'src/settings';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [AsyncPipe, IonBadge, IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs, NgIf, TranslatePipe],
})
export class TabsPage {
  private fullscreenService = inject(FullscreenService);
  private searchCriteriaService = inject(SearchCriteriaService);
  private warningService = inject(WarningService);
  private userSettingService = inject(UserSettingService);
  private tabsService = inject(TabsService);
  private language = toSignal(this.userSettingService.language$, { initialValue: LangKey.nb });
  private warningGroupInMapViewSubscription = toSignal(this.warningService.warningGroupInMapViewObservable$);
  private currentGeoHazardSubscription = toSignal(this.userSettingService.currentGeoHazard$, {
    initialValue: [GeoHazard.NotSpecified],
  });
  readonly selectedTab$: Observable<TABS | null>;
  isFullscreen = toSignal(this.fullscreenService.isFullscreen$, { initialValue: false });
  isDesktop = inject(BreakpointService).isDesktop;
  isNative = Capacitor.isNativePlatform();

  constructor() {
    this.selectedTab$ = this.tabsService.selectedTab$;
    addIcons({ mapOutline, list, warning, openOutline });
  }

  async ngOnInit() {
    combineLatest([this.searchCriteriaService.searchCriteria$, this.tabsService.selectedTab$]).subscribe(
      async ([, tab]) => {
        await this.applyCurrentQueryParams(tab);
      }
    );
  }

  warningsInView = computed(() => {
    const warningsInView = this.warningGroupInMapViewSubscription();
    if (!warningsInView) return null;
    const allWarnings = [...warningsInView.center, ...warningsInView.viewBounds];
    const allMaxWarnings = allWarnings.map((g) => g.getMaxWarning(0));
    const maxWarning = Math.max(...allMaxWarnings.map((x) => x.max));
    const hasEmergencyWarning = allMaxWarnings.some((x) => x.max === maxWarning && x.hasWarning);
    return {
      count: allWarnings.length,
      text: allWarnings.length > 9 ? '9+' : allWarnings.length.toString(),
      maxWarning,
      hasEmergencyWarning,
    };
  });

  showBadge = computed(() => {
    const warningsInView = this.warningsInView();
    if (!warningsInView) return false;
    return warningsInView.maxWarning > 0;
  });

  badgeColor = computed(() => {
    const warningsInView = this.warningsInView();
    if (!warningsInView) return 'warninglevel-0';
    return 'warninglevel-' + warningsInView.maxWarning;
  });

  badgeText = computed(() => {
    const warningsInView = this.warningsInView();
    if (!warningsInView) return '0'; // Ikke vurdert
    return `${warningsInView.maxWarning}${warningsInView.hasEmergencyWarning ? '!' : ''}`;
  });

  warningsLink = computed(() => {
    const isNorwegian =
      this.language() === LangKey.nb ||
      this.language() === LangKey.nn ||
      this.language() === LangKey.sv ||
      this.language() === LangKey.da;
    if (this.currentGeoHazardSubscription()[0] === GeoHazard.Snow) {
      return isNorwegian ? settings.services.warning.Snow.webBaseUrl.nb : settings.services.warning.Snow.webBaseUrl.en;
    } else if (this.currentGeoHazardSubscription()[0] === GeoHazard.Water) {
      return isNorwegian ? settings.services.warning.Soil.webBaseUrl.nb : settings.services.warning.Soil.webBaseUrl.en;
    } else {
      return settings.services.warning.Ice.webBaseUrl.nb;
    }
  });

  private async applyCurrentQueryParams(path: TABS | null) {
    if (path == TABS.HOME || path == TABS.OBSERVATION_LIST || path == TABS.WARNING_LIST) {
      await this.searchCriteriaService.applyQueryParams();
    }
  }
}
