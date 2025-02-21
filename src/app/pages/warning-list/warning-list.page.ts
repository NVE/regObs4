import { Component, inject, viewChildren, signal, computed } from '@angular/core';
import { WarningService } from '../../core/services/warning/warning.service';
import { WarningGroup } from '../../core/services/warning/warning-group.model';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { IVirtualScrollItem } from '../../core/models/virtual-scroll-item.model';
import { GeoHazard } from '../../modules/common-core/models';
import { WarningListItemComponent } from '../../components/warning-list-item/warning-list-item.component';
import { MapService } from '../../modules/map/services/map/map.service';
import {
  IonCol,
  IonContent,
  IonGrid,
  IonItemDivider,
  IonLabel,
  IonList,
  IonRow,
  IonSegment,
  IonSegmentButton,
  SegmentCustomEvent,
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../../modules/shared/components/header/header.component';
import { RefreshWithCancelComponent } from '../../modules/shared/components/refresh-with-cancel/refresh-with-cancel.component';
import { NgTemplateOutlet } from '@angular/common';
import { AbonnerBannerComponent } from './abonner-banner/abonner-banner.component';
import { AddMenuComponent } from '../../modules/shared/components/add-menu/add-menu.component';
import { GeoSelectComponent } from '../../modules/shared/components/geo-select/geo-select.component';
import { SvgIconComponent } from 'angular-svg-icon';
import { TranslatePipe } from '@ngx-translate/core';
import { WarningListHeaderComponent } from 'src/app/components/warning-list-header/warning-list-header.component';
import { toSignal } from '@angular/core/rxjs-interop';

type SelectedTab = 'inMapView' | 'all' | 'favourites';

@Component({
  selector: 'app-warning-list',
  templateUrl: './warning-list.page.html',
  styleUrls: ['./warning-list.page.scss'],
  imports: [
    AbonnerBannerComponent,
    AddMenuComponent,
    GeoSelectComponent,
    HeaderComponent,
    IonCol,
    IonContent,
    IonGrid,
    IonLabel,
    IonRow,
    IonSegment,
    IonSegmentButton,
    NgTemplateOutlet,
    RefreshWithCancelComponent,
    SvgIconComponent,
    TranslatePipe,
    IonList,
    WarningListItemComponent,
    WarningListHeaderComponent,
    IonItemDivider,
  ],
})
export class WarningListPage {
  private warningService = inject(WarningService);
  private userSettingService = inject(UserSettingService);
  mapService = inject(MapService);
  currentGeoHazard = toSignal(this.userSettingService.currentGeoHazard$, { initialValue: [GeoHazard.Snow] });
  noMapExtentAvailable = toSignal(this.mapService.noMapExtentAvailable$);
  warningGroupInMapView = toSignal(this.warningService.warningGroupInMapViewObservable$);
  warningsForCurrentGeoHazard = toSignal(this.warningService.warningsForCurrentGeoHazardObservable$);
  warningsFavourites = toSignal(this.warningService.getWarningGroupFavouritesObservable());
  selectedTab = signal<SelectedTab>('inMapView');
  warningGroups = signal<IVirtualScrollItem<WarningGroup>[]>([]);
  noFavourites = signal(false);
  noRelevant = signal(false);
  refreshFunc = this.refresh.bind(this);
  myFooterFn = this.footerFn.bind(this);

  readonly warningListItems = viewChildren(WarningListItemComponent);

  showNoFavourites = computed(() => this.selectedTab() === 'favourites' && this.getWarnings().length === 0);
  showNoRelevantEmptyState = computed(() => this.selectedTab() === 'inMapView' && this.noRelevant());
  showEmptyState = computed(() => this.showNoFavourites() || this.showNoRelevantEmptyState());

  title = computed(() => {
    if (this.selectedTab() !== 'favourites') {
      return `WARNING_LIST.TITLE_${GeoHazard[this.currentGeoHazard()[0]].toUpperCase()}`;
    } else {
      return 'WARNING_LIST.TITLE';
    }
  });

  getWarnings = computed(() => {
    switch (this.selectedTab()) {
      case 'inMapView':
        return this.warningsInMapViewComputed();
      case 'all':
        return this.getAllWarningsComputed();
      case 'favourites':
        return this.favouriteWarningGroups();
      default:
        return [];
    }
  });

  warningsInMapViewComputed = computed(() => {
    const warnings = this.warningGroupInMapView();
    if (!warnings) {
      return [];
    }
    const center = this.mapToVirtualScrollItem(warnings.center, 'WARNING_LIST.IN_MAP_CENTER');
    const bounds = this.mapToVirtualScrollItem(warnings.viewBounds, 'WARNING_LIST.IN_MAP_VIEW');
    const buffer = this.mapToVirtualScrollItem(
      warnings.buffer.filter((wg) => wg.hasAnyWarnings()),
      'WARNING_LIST.OTHER_RELEVANT'
    );
    return [...center, ...bounds, ...(bounds.length < 3 ? buffer : [])];
  });

  getAllWarningsComputed = computed(() => {
    if (this.currentGeoHazard()[0] === GeoHazard.Snow) {
      return this.getSnowRegionWarnings();
    } else {
      const warnings = this.warningsForCurrentGeoHazard();
      if (!warnings) {
        return [];
      }
      return this.mapToVirtualScrollItem(warnings, 'WARNING_LIST.ALL_WARNINGS');
    }
  });

  favouriteWarningGroups = computed(() => {
    const warnings = this.warningsFavourites();
    if (!warnings) {
      this.noFavourites.set(true);
      return [];
    }
    return this.mapToVirtualScrollItem(warnings, 'WARNING_LIST.FAVOURITES');
  });

  async refresh(cancelPromise?: Promise<any>) {
    await this.warningService.updateWarningsForCurrentGeoHazard(cancelPromise);
  }

  myHeaderFn(item: IVirtualScrollItem<WarningGroup>, index: number, items: IVirtualScrollItem<WarningGroup>[]) {
    return item.header
      ? {
          header: item.header,
          infoText: item.infoText,
          showDayNames: items.some((x) => x.item.key.geoHazard !== GeoHazard.Ice),
        }
      : null;
  }

  showDayNames(warningGroup: IVirtualScrollItem<WarningGroup>) {
    return warningGroup.item.key.geoHazard !== GeoHazard.Ice;
  }

  onSegmentChange(event: SegmentCustomEvent) {
    const selectedTab = event.detail.value as SelectedTab;
    this.selectedTab.set(selectedTab);
  }

  closeAllOpen() {
    for (const item of this.warningListItems()) {
      item.close();
    }
  }

  private mapToVirtualScrollItem(
    wg: WarningGroup[],
    header?: string,
    infoText?: string
  ): IVirtualScrollItem<WarningGroup>[] {
    return wg.map((item, index) => ({
      header: index === 0 ? header : undefined,
      infoText: index === 0 ? infoText : undefined,
      item,
    }));
  }

  private getSnowRegionWarnings(): IVirtualScrollItem<WarningGroup>[] {
    const regionsA = this.getARegionWarnings();
    const regionsB = this.getBRegionWarnings();
    return [...regionsA, ...regionsB];
  }

  private getARegionWarnings(): IVirtualScrollItem<WarningGroup>[] {
    const warnings = this.warningsForCurrentGeoHazard();
    if (!warnings) {
      return [];
    }

    return this.mapToVirtualScrollItem(
      warnings.filter((item) => item.groupType === 'A'),
      'WARNING_LIST.A_REGIONS'
    );
  }

  private getBRegionWarnings(): IVirtualScrollItem<WarningGroup>[] {
    const warnings = this.warningsForCurrentGeoHazard();
    if (!warnings) {
      return [];
    }

    return this.mapToVirtualScrollItem(
      warnings.filter((item) => item.groupType === 'B'),
      'WARNING_LIST.B_REGIONS',
      'WARNING_LIST.B_REGIONS_SUBTITLE'
    );
  }

  private footerFn(item: IVirtualScrollItem<WarningGroup>, index: number, items: IVirtualScrollItem<WarningGroup>[]) {
    if (this.selectedTab() !== 'inMapView' && index === items.length - 1) {
      return 'footer';
    }
    return undefined;
  }

  ionViewEnter() {
    this.selectedTab.set(this.noMapExtentAvailable() ? 'all' : 'inMapView');
  }

  ionViewWillLeave() {
    this.closeAllOpen();
  }
}
