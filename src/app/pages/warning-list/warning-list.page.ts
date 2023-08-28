import { Component, NgZone, ViewChildren, QueryList } from '@angular/core';
import { WarningService } from '../../core/services/warning/warning.service';
import { Observable, BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, switchMap, tap, takeUntil } from 'rxjs/operators';
import { WarningGroup } from '../../core/services/warning/warning-group.model';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { IVirtualScrollItem } from '../../core/models/virtual-scroll-item.model';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { WarningListItemComponent } from '../../components/warning-list-item/warning-list-item.component';
import { MapService } from 'src/app/modules/map/services/map/map.service';
import { SegmentCustomEvent } from '@ionic/angular';

type SelectedTab = 'inMapView' | 'all' | 'favourites';

@Component({
  selector: 'app-warning-list',
  templateUrl: './warning-list.page.html',
  styleUrls: ['./warning-list.page.scss'],
})
export class WarningListPage {
  private selectedTab = new BehaviorSubject<SelectedTab>('inMapView');
  selectedTab$ = this.selectedTab.asObservable();

  warningGroups: IVirtualScrollItem<WarningGroup>[] = [];
  private ngDestroySubject: Subject<void>;
  refreshFunc = this.refresh.bind(this);
  title = 'WARNING_LIST.TITLE';
  noFavourites = false;
  noRelevant = false;
  trackByFunc = this.trackByInternal.bind(this);
  loaded = false;
  myFooterFn = this.footerFn.bind(this);

  @ViewChildren(WarningListItemComponent)
  warningListItems: QueryList<WarningListItemComponent>;

  get showNoFavourites() {
    return this.selectedTab.value === 'favourites' && this.noFavourites;
  }

  get showNoRelevantEmptyState() {
    return this.selectedTab.value === 'inMapView' && this.noRelevant;
  }

  get showEmptyState() {
    return this.showNoFavourites || this.showNoRelevantEmptyState;
  }

  constructor(
    private warningService: WarningService,
    private userSettingService: UserSettingService,
    public mapService: MapService,
    private ngZone: NgZone
  ) {}

  closeAllOpen() {
    if (this.warningListItems) {
      for (const item of this.warningListItems.toArray()) {
        item.close();
      }
    }
  }

  ionViewDidEnter() {
    this.ngDestroySubject = new Subject();
    this.loaded = false;
    combineLatest([this.selectedTab$, this.userSettingService.currentGeoHazard$])
      .pipe(
        switchMap(([segment, currentGeoHazard]) => this.getWarningGroupObservable(segment, currentGeoHazard)),
        takeUntil(this.ngDestroySubject)
      )
      .subscribe((warningGroups) => {
        this.ngZone.run(() => {
          this.closeAllOpen();
          this.warningGroups = warningGroups;
          this.hackToShowVirtualScrollItemsThatIsNotVisibleAtFirstLoad();
        });
      });
    combineLatest([this.selectedTab$, this.userSettingService.currentGeoHazard$])
      .pipe(takeUntil(this.ngDestroySubject))
      .subscribe(([selectedTab, currentGeoHazard]) => {
        this.ngZone.run(() => {
          this.setTitle(selectedTab, currentGeoHazard);
        });
      });
    this.mapService.noMapExtentAvailable$.pipe(takeUntil(this.ngDestroySubject)).subscribe((noExtentAvailable) => {
      this.selectedTab.next(noExtentAvailable ? 'all' : 'inMapView');
    });
  }

  private hackToShowVirtualScrollItemsThatIsNotVisibleAtFirstLoad() {
    if (!this.loaded && this.warningGroups && this.warningGroups.length > 0) {
      const currentItems = [...this.warningGroups];
      setTimeout(() => {
        this.warningGroups = null;
        setTimeout(() => {
          // Hack to virtual scroll items not showing at first load
          this.warningGroups = currentItems;
          this.loaded = true;
        }, 200);
      }, 200);
    }
  }

  private setTitle(selectedTab: SelectedTab, currentGeoHazard: GeoHazard[]) {
    if (selectedTab !== 'favourites') {
      this.title = `WARNING_LIST.TITLE_${GeoHazard[currentGeoHazard[0]].toUpperCase()}`;
    } else {
      this.title = 'WARNING_LIST.TITLE';
    }
  }

  refresh(cancelPromise: Promise<any>) {
    return this.warningService.updateWarningsForCurrentGeoHazard(cancelPromise);
  }

  private getWarningGroupObservable(
    segment: SelectedTab,
    currentGeoHazard: GeoHazard[]
  ): Observable<IVirtualScrollItem<WarningGroup>[]> {
    switch (segment) {
      case 'inMapView':
        return this.getWarningsInMapView();
      case 'all':
        return this.getAllWarnings(currentGeoHazard);
      case 'favourites':
        return this.getFavouritesObservable();
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

  private getWarningsInMapView() {
    return combineLatest([
      this.getWarningsInMapViewCenter(),
      this.getWarningsInMapViewBounds(),
      this.getWarningsInMapViewBuffer(),
    ]).pipe(
      map(([a, b, c]) => [...a, ...b, ...(b.length < 3 ? c : [])]),
      tap((val) => {
        this.ngZone.run(() => {
          this.noRelevant = val.length === 0;
        });
      })
    );
  }

  private getWarningsInMapViewCenter(): Observable<IVirtualScrollItem<WarningGroup>[]> {
    return this.warningService.warningGroupInMapViewObservable$.pipe(
      map((val) => this.mapToVirtualScrollItem(val.center, 'WARNING_LIST.IN_MAP_CENTER'))
    );
  }

  private getWarningsInMapViewBounds(): Observable<IVirtualScrollItem<WarningGroup>[]> {
    return this.warningService.warningGroupInMapViewObservable$.pipe(
      map((val) => this.mapToVirtualScrollItem(val.viewBounds, 'WARNING_LIST.IN_MAP_VIEW'))
    );
  }

  private getWarningsInMapViewBuffer(): Observable<IVirtualScrollItem<WarningGroup>[]> {
    return this.warningService.warningGroupInMapViewObservable$.pipe(
      map((val) =>
        this.mapToVirtualScrollItem(
          val.buffer.filter((wg) => wg.hasAnyWarnings()),
          'WARNING_LIST.OTHER_RELEVANT'
        )
      )
    );
  }

  private getAllWarnings(currentGeoHazard: GeoHazard[]): Observable<IVirtualScrollItem<WarningGroup>[]> {
    if (currentGeoHazard[0] === GeoHazard.Snow) {
      return this.getSnowRegionWarnings();
    } else {
      return this.warningService.warningsForCurrentGeoHazardObservable$.pipe(
        map((wg: WarningGroup[]) => this.mapToVirtualScrollItem(wg, 'WARNING_LIST.ALL_WARNINGS'))
      );
    }
  }

  private getSnowRegionWarnings(): Observable<IVirtualScrollItem<WarningGroup>[]> {
    return combineLatest([this.getARegionWarnings(), this.getBRegionWarnings()]).pipe(map(([a, b]) => [...a, ...b]));
  }

  private getARegionWarnings(): Observable<IVirtualScrollItem<WarningGroup>[]> {
    return this.warningService.warningsForCurrentGeoHazardObservable$.pipe(
      map((wg: WarningGroup[]) =>
        this.mapToVirtualScrollItem(
          wg.filter((item) => item.groupType === 'A'),
          'WARNING_LIST.A_REGIONS'
        )
      )
    );
  }

  private getBRegionWarnings(): Observable<IVirtualScrollItem<WarningGroup>[]> {
    return this.warningService.warningsForCurrentGeoHazardObservable$.pipe(
      map((wg: WarningGroup[]) =>
        this.mapToVirtualScrollItem(
          wg.filter((item) => item.groupType === 'B'),
          'WARNING_LIST.B_REGIONS',
          'WARNING_LIST.B_REGIONS_SUBTITLE'
        )
      )
    );
  }

  private getFavouritesObservable() {
    return this.warningService.getWarningGroupFavouritesObservable().pipe(
      tap((val) => {
        this.ngZone.run(() => {
          this.noFavourites = val.length === 0;
        });
      }),
      map((warningGroups) => this.mapToVirtualScrollItem(warningGroups, 'WARNING_LIST.FAVOURITES'))
    );
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

  private footerFn(item: IVirtualScrollItem<WarningGroup>, index: number, items: IVirtualScrollItem<WarningGroup>[]) {
    if (this.selectedTab.value !== 'inMapView' && index === items.length - 1) {
      return 'footer';
    }
  }

  trackByInternal(_, item: IVirtualScrollItem<WarningGroup>) {
    return item && item.item ? item.item.getKeyAsString() : undefined;
  }

  ionViewWillLeave() {
    this.closeAllOpen();
    this.ngDestroySubject.next();
    this.ngDestroySubject.complete();
  }

  onSegmentChange(event: SegmentCustomEvent) {
    this.selectedTab.next(event.detail.value as SelectedTab);
  }
}
