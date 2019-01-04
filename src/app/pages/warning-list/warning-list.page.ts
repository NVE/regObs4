import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { WarningService } from '../../core/services/warning/warning.service';
import { Observable, BehaviorSubject, Subscription, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { WarningGroup } from '../../core/services/warning/warning-group.model';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { IVirtualScrollItem } from '../../core/models/virtual-scroll-item.model';
import { UserSetting } from '../../core/models/user-settings.model';
import { GeoHazard } from '../../core/models/geo-hazard.enum';

type SelectedTab = 'inMapView' | 'all' | 'favourites';

@Component({
  selector: 'app-warning-list',
  templateUrl: './warning-list.page.html',
  styleUrls: ['./warning-list.page.scss'],
})
export class WarningListPage implements OnInit, OnDestroy {
  selectedTab: SelectedTab;
  warningGroups: IVirtualScrollItem<WarningGroup>[] = [];
  private segmentPageSubject: BehaviorSubject<SelectedTab>;
  private segmentPageObservable: Observable<SelectedTab>;
  private subscription: Subscription;
  refreshFunc: Function;

  constructor(
    private warningService: WarningService,
    private userSettingService: UserSettingService,
    private ngZone: NgZone) {
  }

  ngOnInit() {
    this.selectedTab = 'inMapView';
    this.refreshFunc = this.refresh.bind(this);
    this.segmentPageSubject = new BehaviorSubject<SelectedTab>(this.selectedTab);
    this.segmentPageObservable = this.segmentPageSubject.asObservable();
  }

  ionViewDidEnter() {
    this.subscription = combineLatest(this.segmentPageObservable, this.userSettingService.userSettingObservable$).pipe(
      switchMap(([segment, userSetting]) => this.getWarningGroupObservable(segment, userSetting)),
    ).subscribe((warningGroups) => {
      this.ngZone.run(() => {
        this.warningGroups = warningGroups;
      });
    });
  }

  refresh(cancelPromise: Promise<any>) {
    return this.warningService.updateWarningsForCurrentGeoHazard(cancelPromise);
  }

  private getWarningGroupObservable(segment: SelectedTab, userSetting: UserSetting)
    : Observable<IVirtualScrollItem<WarningGroup>[]> {
    switch (segment) {
      case 'inMapView':
        return this.getWarningsInMapView();
      case 'all':
        return this.getAllWarnings(userSetting);
      case 'favourites':
        return this.getFavouritesObservable();
    }
  }

  private mapToVirtualScrollItem(wg: WarningGroup[], header?: string, infoText?: string):
    IVirtualScrollItem<WarningGroup>[] {
    return wg.map((item, index) => ({
      header: index === 0 ? header : undefined,
      infoText: index === 0 ? infoText : undefined,
      item
    }));
  }

  private getWarningsInMapView() {
    return combineLatest(
      this.getWarningsInMapViewCenter(),
      this.getWarningsInMapViewBounds(),
      this.getWarningsInMapViewBuffer())
      .pipe(map(([a, b, c]) => ([...a, ...b, ...(b.length < 3 ? c : [])])));
  }

  private getWarningsInMapViewCenter(): Observable<IVirtualScrollItem<WarningGroup>[]> {
    return this.warningService.warningGroupInMapViewObservable$
      .pipe(map((val) => this.mapToVirtualScrollItem(val.center, 'WARNING_LIST.IN_MAP_CENTER')));
  }

  private getWarningsInMapViewBounds(): Observable<IVirtualScrollItem<WarningGroup>[]> {
    return this.warningService.warningGroupInMapViewObservable$
      .pipe(map((val) => this.mapToVirtualScrollItem(val.viewBounds, 'WARNING_LIST.IN_MAP_VIEW')));
  }

  private getWarningsInMapViewBuffer(): Observable<IVirtualScrollItem<WarningGroup>[]> {
    return this.warningService.warningGroupInMapViewObservable$
      .pipe(map((val) => this.mapToVirtualScrollItem(val.buffer.filter((wg) => wg.hasAnyWarnings()), 'WARNING_LIST.OTHER_RELEVANT')));
  }

  private getAllWarnings(userSetting: UserSetting): Observable<IVirtualScrollItem<WarningGroup>[]> {
    if (userSetting.currentGeoHazard[0] === GeoHazard.Snow) {
      return this.getSnowRegionWarnings();
    } else {
      return this.warningService.warningsForCurrentGeoHazardObservable$
        .pipe(map((wg: WarningGroup[]) => this.mapToVirtualScrollItem(wg, 'WARNING_LIST.ALL_WARNINGS')));
    }
  }

  private getSnowRegionWarnings(): Observable<IVirtualScrollItem<WarningGroup>[]> {
    return combineLatest(this.getARegionWarnings(), this.getBRegionWarnings())
      .pipe(map(([a, b]) => ([...a, ...b])));
  }

  private getARegionWarnings(): Observable<IVirtualScrollItem<WarningGroup>[]> {
    return this.warningService.warningsForCurrentGeoHazardObservable$
      .pipe(map((wg: WarningGroup[]) => this.mapToVirtualScrollItem(
        wg.filter((item) => item.groupType === 'A'), 'WARNING_LIST.A_REGIONS')));
  }

  private getBRegionWarnings(): Observable<IVirtualScrollItem<WarningGroup>[]> {
    return this.warningService.warningsForCurrentGeoHazardObservable$
      .pipe(map((wg: WarningGroup[]) => this.mapToVirtualScrollItem(
        wg.filter((item) => item.groupType === 'B'), 'WARNING_LIST.B_REGIONS', 'WARNING_LIST.B_REGIONS_SUBTITLE')));
  }

  private getFavouritesObservable() {
    return this.warningService.warningsObservable$
      .pipe(map((warningGroups) =>
        this.mapToVirtualScrollItem(warningGroups.filter((wg) => wg.isFavourite), 'WARNING_LIST.FAVOURITES'))
      );
  }

  myHeaderFn(record: IVirtualScrollItem<WarningGroup>, recordIndex: number, records: IVirtualScrollItem<WarningGroup>[]) {
    return record.header ? {
      header: record.header,
      infoText: record.infoText,
      showDayNames: records.some((x) => x.item.key.geoHazard !== GeoHazard.Ice)
    } : null;
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSegmentChange() {
    this.segmentPageSubject.next(this.selectedTab);
  }

  ngOnDestroy(): void {

  }
}
