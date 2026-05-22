import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonButtons, IonContent, IonIcon, IonMenu, IonMenuButton, IonSplitPane } from '@ionic/angular/standalone';
import L from 'leaflet';
import { EMPTY, Observable, combineLatest, of } from 'rxjs';
import { catchError, expand, map, reduce, switchMap, takeUntil, timeout } from 'rxjs/operators';
import { AnalysisFilterService } from 'src/app/core/services/analysis-filter/analysis-filter.service';
import { RouterPage } from 'src/app/core/helpers/routed-page';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { SearchService } from 'src/app/modules/common-regobs-api';
import { RegistrationViewModel, SearchCriteriaRequestDto } from 'src/app/modules/common-regobs-api/models';
import { MapComponent } from 'src/app/modules/map/components/map/map.component';
import { HeaderComponent } from 'src/app/modules/shared/components/header/header.component';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { AnalysisFilterMenuComponent } from './components/analysis-filter-menu/analysis-filter-menu.component';
import { AnalysisTimeSliderComponent } from './components/analysis-time-slider/analysis-time-slider.component';
import { toObservable } from '@angular/core/rxjs-interop';
import moment from 'moment';

const DEBUG_TAG = 'AnalysisPage';

const PAGE_SIZE = 1000;
const MAX_PAGES = 10;

// Snow group / sub-type IDs (verified in src/assets/json/searchcriteria.nb.json):
// Avalanche/Skredhendelse: Id=80 (Hendelser) + SubType 26
// Faretegn: Id=81 (Skred og faretegn) + SubType 13
const GROUP_ID_AVALANCHE = 80;
const GROUP_ID_DANGER_SIGN = 81;
const SUBTYPE_AVALANCHE = 26;
const SUBTYPE_DANGER_SIGN = 13;

// Marker colors
const COLOR_DANGER = '#000000';
const COLOR_AVALANCHE = '#d9322a';

// Opacity for active vs dimmed dots
const OPACITY_ACTIVE_FILL = 1;
const OPACITY_ACTIVE_STROKE = 1;
const OPACITY_DIMMED_FILL = 0.2;
const OPACITY_DIMMED_STROKE = 1;

// Radius mapping for avalanche by DestructiveSizeTID
const AVALANCHE_RADIUS_BY_SIZE: Record<number, number> = {
  1: 6,
  2: 9,
  3: 13,
  4: 17,
  5: 22,
};
const DEFAULT_AVALANCHE_RADIUS = 6;
const DANGER_SIGN_RADIUS = 6;

interface AnalysisMarker {
  marker: L.CircleMarker;
  dateKey: string; // yyyy-MM-dd of DtObsTime
}

@Component({
  selector: 'app-analysis',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'analysis.page.html',
  styleUrls: ['analysis.page.scss'],
  imports: [
    AnalysisFilterMenuComponent,
    AnalysisTimeSliderComponent,
    HeaderComponent,
    IonButtons,
    IonContent,
    IonIcon,
    IonMenu,
    IonMenuButton,
    IonSplitPane,
    MapComponent,
  ],
})
export class AnalysisPage extends RouterPage implements OnDestroy {
  private searchService = inject(SearchService);
  private searchCriteriaService = inject(SearchCriteriaService);
  private analysisFilterService = inject(AnalysisFilterService);
  private loggingService = inject(LoggingService);

  readonly mapComponent = viewChild.required(MapComponent);
  readonly mapHost = viewChild<ElementRef<HTMLElement>>('mapHost');

  private map?: L.Map;
  private canvasRenderer = L.canvas({ padding: 0.2 });
  private dangerLayer = L.layerGroup();
  private avalancheLayer = L.layerGroup();
  private dangerMarkers: AnalysisMarker[] = [];
  private avalancheMarkers: AnalysisMarker[] = [];

  // Effect: re-render markers when active date changes
  private activeDate = this.analysisFilterService.activeDate;
  // Disclaimer / loading state are kept simple here; can be expanded later.
  showDangerSigns = this.analysisFilterService.showDangerSigns;
  showAvalanches = this.analysisFilterService.showAvalanches;

  constructor() {
    const router = inject(Router);
    const route = inject(ActivatedRoute);
    super(router, route);

    this.initSearch();

    effect(() => {
      const date = this.activeDate();
      this.applyActiveDateOpacity(date);
    });

    effect(() => {
      this.dangerLayer && this.toggleLayer(this.dangerLayer, this.showDangerSigns());
    });

    effect(() => {
      this.avalancheLayer && this.toggleLayer(this.avalancheLayer, this.showAvalanches());
    });
  }

  onEnter(): void {
    // No-op; the search pipeline is active for the lifetime of the component.
  }

  onLeave(): void {
    // No-op
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.dangerLayer.addTo(map);
    this.avalancheLayer.addTo(map);
    this.toggleLayer(this.dangerLayer, this.showDangerSigns());
    this.toggleLayer(this.avalancheLayer, this.showAvalanches());
  }

  private toggleLayer(layer: L.LayerGroup, show: boolean) {
    if (!this.map) return;
    if (show && !this.map.hasLayer(layer)) {
      this.map.addLayer(layer);
    } else if (!show && this.map.hasLayer(layer)) {
      this.map.removeLayer(layer);
    }
  }

  private initSearch() {
    const baseCriteria$ = this.searchCriteriaService.searchCriteria$;
    const showDanger$ = toObservable(this.analysisFilterService.showDangerSigns);
    const showAvalanche$ = toObservable(this.analysisFilterService.showAvalanches);
    const refDate$ = toObservable(this.analysisFilterService.referenceDate);
    const fromDate$ = toObservable(this.analysisFilterService.fromDate);

    combineLatest([baseCriteria$, showDanger$, showAvalanche$, refDate$, fromDate$])
      .pipe(
        takeUntil(this.ngUnsubscribe),
        map(([base, showDanger, showAvalanche, refDate, fromDate]) =>
          this.buildAnalysisCriteria(base, showDanger, showAvalanche, refDate, fromDate)
        ),
        switchMap((criteria) => {
          if (!criteria) {
            // No types selected → clear
            this.clearMarkers();
            return of([] as RegistrationViewModel[]);
          }
          return this.fetchAllPages(criteria);
        })
      )
      .subscribe((registrations) => {
        this.renderRegistrations(registrations);
      });
  }

  private buildAnalysisCriteria(
    base: SearchCriteriaRequestDto,
    showDanger: boolean,
    showAvalanche: boolean,
    refDate: string,
    fromDate: string
  ): SearchCriteriaRequestDto | null {
    if (!showDanger && !showAvalanche) {
      return null;
    }

    const selectedTypes: { Id: number; SubTypes?: number[] }[] = [];
    if (showDanger) {
      selectedTypes.push({ Id: GROUP_ID_DANGER_SIGN, SubTypes: [SUBTYPE_DANGER_SIGN] });
    }
    if (showAvalanche) {
      selectedTypes.push({ Id: GROUP_ID_AVALANCHE, SubTypes: [SUBTYPE_AVALANCHE] });
    }

    return {
      ...base,
      SelectedGeoHazards: [GeoHazard.Snow],
      SelectedRegistrationTypes: selectedTypes,
      FromDtObsTime: moment(fromDate).startOf('day').toISOString(true),
      ToDtObsTime: moment(refDate).endOf('day').toISOString(true),
      NumberOfRecords: PAGE_SIZE,
      Offset: 0,
    };
  }

  private fetchAllPages(criteria: SearchCriteriaRequestDto): Observable<RegistrationViewModel[]> {
    let pagesFetched = 0;
    return this.searchService.SearchSearch(criteria).pipe(
      timeout(120000),
      expand((page) => {
        pagesFetched++;
        if (page.length < PAGE_SIZE || pagesFetched >= MAX_PAGES) {
          return EMPTY;
        }
        const nextCriteria: SearchCriteriaRequestDto = {
          ...criteria,
          Offset: (criteria.Offset ?? 0) + pagesFetched * PAGE_SIZE,
        };
        return this.searchService.SearchSearch(nextCriteria).pipe(timeout(120000));
      }),
      reduce((acc: RegistrationViewModel[], page: RegistrationViewModel[]) => acc.concat(page), []),
      catchError((err) => {
        this.loggingService.error(err, DEBUG_TAG, 'Failed to fetch analysis registrations');
        return of([] as RegistrationViewModel[]);
      })
    );
  }

  private renderRegistrations(registrations: RegistrationViewModel[]) {
    this.clearMarkers();

    for (const reg of registrations) {
      const lat = reg.ObsLocation?.Latitude;
      const lon = reg.ObsLocation?.Longitude;
      if (lat == null || lon == null) continue;
      const dateKey = reg.DtObsTime ? reg.DtObsTime.slice(0, 10) : '';

      // Faretegn (filter out DangerSignTID === 1 = "Ingen faretegn observert")
      const dangerObs = (reg.DangerObs ?? []).filter(
        (o) => o.GeoHazardTID === GeoHazard.Snow && o.DangerSignTID !== 1 && o.DangerSignTID != null
      );
      if (dangerObs.length > 0) {
        const dangerNames = dangerObs
          .map((o) => o.DangerSignName)
          .filter((n) => !!n)
          .join(', ');
        const tooltip = `Faretegn: ${dangerNames}`;
        const marker = this.createMarker(lat, lon, DANGER_SIGN_RADIUS, COLOR_DANGER, tooltip);
        marker.addTo(this.dangerLayer);
        this.dangerMarkers.push({ marker, dateKey });
      }

      // Skredhendelse (AvalancheObs is a single object on the registration)
      const ava = reg.AvalancheObs;
      if (ava) {
        const size = ava.DestructiveSizeTID;
        const radius = (size != null && AVALANCHE_RADIUS_BY_SIZE[size]) || DEFAULT_AVALANCHE_RADIUS;
        const parts: string[] = [];
        if (ava.DestructiveSizeName) parts.push(ava.DestructiveSizeName);
        if (ava.AvalancheName) parts.push(ava.AvalancheName);
        if (ava.AvalancheTriggerName) parts.push(ava.AvalancheTriggerName);
        const tooltip = `Skred: ${parts.join(', ')}`;
        const marker = this.createMarker(lat, lon, radius, COLOR_AVALANCHE, tooltip);
        marker.addTo(this.avalancheLayer);
        this.avalancheMarkers.push({ marker, dateKey });
      }
    }

    this.applyActiveDateOpacity(this.activeDate());
  }

  private createMarker(lat: number, lon: number, radius: number, color: string, tooltip: string): L.CircleMarker {
    const marker = L.circleMarker([lat, lon], {
      renderer: this.canvasRenderer,
      radius,
      color,
      weight: 1,
      fillColor: color,
      fillOpacity: OPACITY_ACTIVE_FILL,
      opacity: OPACITY_ACTIVE_STROKE,
    });
    if (tooltip) {
      marker.bindTooltip(tooltip, { direction: 'top', opacity: 0.9 });
    }
    return marker;
  }

  private applyActiveDateOpacity(activeDate: string) {
    const apply = (markers: AnalysisMarker[]) => {
      for (const m of markers) {
        const isActive = m.dateKey === activeDate;
        m.marker.setStyle({
          fillOpacity: isActive ? OPACITY_ACTIVE_FILL : OPACITY_DIMMED_FILL,
          opacity: isActive ? OPACITY_ACTIVE_STROKE : OPACITY_DIMMED_STROKE,
        });
      }
    };
    apply(this.dangerMarkers);
    apply(this.avalancheMarkers);
  }

  private clearMarkers() {
    this.dangerLayer.clearLayers();
    this.avalancheLayer.clearLayers();
    this.dangerMarkers = [];
    this.avalancheMarkers = [];
  }
}
