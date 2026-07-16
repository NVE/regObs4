import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { IonBadge, IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import { auditTime, combineLatest, concatMap } from 'rxjs';
import { FullscreenService } from '../../core/services/fullscreen/fullscreen.service';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { GeoHazard, LangKey } from '../../modules/common-core/models';
import { SearchCriteriaService } from '../../core/services/search-criteria/search-criteria.service';
import { WarningService } from '../../core/services/warning/warning.service';
import { TABS, TabsService } from './tabs.service';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { mapOutline, list, warning, openOutline, analyticsOutline } from 'ionicons/icons';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { BreakpointService } from 'src/app/core/services/breakpoint.service';
import { Capacitor } from '@capacitor/core';
import { settings } from 'src/settings';

@Component({
  selector: 'app-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonBadge, IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs, TranslatePipe],
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
  selectedTab = toSignal(this.tabsService.selectedTab$, { initialValue: null });
  isFullscreen = toSignal(this.fullscreenService.isFullscreen$, { initialValue: false });
  isDesktop = inject(BreakpointService).isDesktop;
  isNative = Capacitor.isNativePlatform();

  constructor() {
    addIcons({ mapOutline, list, warning, openOutline, analyticsOutline });
    combineLatest([
      this.searchCriteriaService.searchCriteria$,
      toObservable(this.searchCriteriaService.isExtentCriteriaActive),
      this.tabsService.selectedTab$,
    ])
      .pipe(
        auditTime(500), // Oppdater url maks hvert 500 ms
        concatMap(([, , tab]) => this.applyCurrentQueryParams(tab))
      )
      .subscribe();
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

  iconLayout = computed(() => (this.isDesktop() ? 'icon-start' : 'icon-top'));

  isSnowSelected = computed(() => this.currentGeoHazardSubscription().includes(GeoHazard.Snow));
  showAnalysisTab = computed(() => this.isDesktop() && !this.isNative);

  private async applyCurrentQueryParams(path: TABS | null) {
    if (path == TABS.HOME || path == TABS.WARNING_LIST || path == TABS.ANALYSIS) {
      await this.searchCriteriaService.applyQueryParams();
    } else if (path == TABS.OBSERVATION_LIST) {
      await this.searchCriteriaService.applyQueryParams(false);
    }
  }
}
