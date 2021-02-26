import {
  Component,
  OnInit,
  NgZone,
  ViewChildren,
  QueryList
} from '@angular/core';
import { WarningService } from '../../core/services/warning/warning.service';
import { Observable, BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, switchMap, tap, takeUntil } from 'rxjs/operators';
import { WarningGroup } from '../../core/services/warning/warning-group.model';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { IVirtualScrollItem } from '../../core/models/virtual-scroll-item.model';
import { GeoHazard } from '@varsom-regobs-common/core';
import { WarningListItemComponent } from '../../components/warning-list-item/warning-list-item.component';

type SelectedTab = 'inMapView' | 'all' | 'favourites';

@Component({
  selector: 'app-warning-list',
  templateUrl: './warning-list.page.html',
  styleUrls: ['./warning-list.page.scss']
})
export class WarningListPage implements OnInit {
  selectedTab: SelectedTab;
  warningGroups: IVirtualScrollItem<WarningGroup>[] = [];
  private segmentPageSubject: BehaviorSubject<SelectedTab>;
  private segmentPageObservable: Observable<SelectedTab>;
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
    return this.selectedTab === 'favourites' && this.noFavourites;
  }

  get showNoRelevantEmptyState() {
    return this.selectedTab === 'inMapView' && this.noRelevant;
  }

  get showEmptyState() {
    return this.showNoFavourites || this.showNoRelevantEmptyState;
  }

  constructor(
    private warningService: WarningService,
    private userSettingService: UserSettingService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.selectedTab = 'inMapView';
    this.segmentPageSubject = new BehaviorSubject<SelectedTab>(
      this.selectedTab
    );
    this.segmentPageObservable = this.segmentPageSubject.asObservable();
  }

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
    combineLatest([
      this.segmentPageObservable,
      this.userSettingService.currentGeoHazard$
    ])
      .pipe(
        switchMap(([segment, currentGeoHazard]) =>
          this.getWarningGroupObservable(segment, currentGeoHazard)
        ),
        takeUntil(this.ngDestroySubject)
      )
      .subscribe((warningGroups) => {
        this.ngZone.run(() => {
          this.closeAllOpen();
          this.warningGroups = warningGroups;
          this.hackToShowVirtualScrollItemsThatIsNotVisibleAtFirstLoad();
        });
      });
    combineLatest([
      this.segmentPageObservable,
      this.userSettingService.currentGeoHazard$
    ])
      .pipe(takeUntil(this.ngDestroySubject))
      .subscribe(([selectedTab, currentGeoHazard]) => {
        this.ngZone.run(() => {
          this.setTitle(selectedTab, currentGeoHazard);
        });
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
      this.title = `WARNING_LIST.TITLE_${GeoHazard[
        currentGeoHazard[0]
      ].toUpperCase()}`;
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
      item
    }));
  }

  private getWarningsInMapView() {
    return combineLatest([
      this.getWarningsInMapViewCenter(),
      this.getWarningsInMapViewBounds(),
      this.getWarningsInMapViewBuffer()
    ]).pipe(
      map(([a, b, c]) => [...a, ...b, ...(b.length < 3 ? c : [])]),
      tap((val) => {
        this.ngZone.run(() => {
          this.noRelevant = val.length === 0;
        });
      })
    );
  }

  private getWarningsInMapViewCenter(): Observable<
    IVirtualScrollItem<WarningGroup>[]
  > {
    return this.warningService.warningGroupInMapViewObservable$.pipe(
      map((val) =>
        this.mapToVirtualScrollItem(val.center, 'WARNING_LIST.IN_MAP_CENTER')
      )
    );
  }

  private getWarningsInMapViewBounds(): Observable<
    IVirtualScrollItem<WarningGroup>[]
  > {
    return this.warningService.warningGroupInMapViewObservable$.pipe(
      map((val) =>
        this.mapToVirtualScrollItem(val.viewBounds, 'WARNING_LIST.IN_MAP_VIEW')
      )
    );
  }

  private getWarningsInMapViewBuffer(): Observable<
    IVirtualScrollItem<WarningGroup>[]
  > {
    return this.warningService.warningGroupInMapViewObservable$.pipe(
      map((val) =>
        this.mapToVirtualScrollItem(
          val.buffer.filter((wg) => wg.hasAnyWarnings()),
          'WARNING_LIST.OTHER_RELEVANT'
        )
      )
    );
  }

  private getAllWarnings(
    currentGeoHazard: GeoHazard[]
  ): Observable<IVirtualScrollItem<WarningGroup>[]> {
    if (currentGeoHazard[0] === GeoHazard.Snow) {
      return this.getSnowRegionWarnings();
    } else {
      return this.warningService.warningsForCurrentGeoHazardObservable$.pipe(
        map((wg: WarningGroup[]) =>
          this.mapToVirtualScrollItem(wg, 'WARNING_LIST.ALL_WARNINGS')
        )
      );
    }
  }

  private getSnowRegionWarnings(): Observable<
    IVirtualScrollItem<WarningGroup>[]
  > {
    return combineLatest([
      this.getARegionWarnings(),
      this.getBRegionWarnings()
    ]).pipe(map(([a, b]) => [...a, ...b]));
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
      map((warningGroups) =>
        this.mapToVirtualScrollItem(warningGroups, 'WARNING_LIST.FAVOURITES')
      )
    );
  }

  myHeaderFn(
    item: IVirtualScrollItem<WarningGroup>,
    index: number,
    items: IVirtualScrollItem<WarningGroup>[]
  ) {
    return item.header
      ? {
          header: item.header,
          infoText: item.infoText,
          showDayNames: items.some(
            (x) => x.item.key.geoHazard !== GeoHazard.Ice
          )
        }
      : null;
  }

  private footerFn(
    item: IVirtualScrollItem<WarningGroup>,
    index: number,
    items: IVirtualScrollItem<WarningGroup>[]
  ) {
    if (this.selectedTab !== 'inMapView' && index === items.length - 1) {
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

  onSegmentChange() {
    this.segmentPageSubject.next(this.selectedTab);
  }
}
