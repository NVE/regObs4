import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NEVER, of } from 'rxjs';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MapCenterInfoComponent } from './map-center-info.component';
import { MapService } from '../../services/map/map.service';
import { MapSearchService } from '../../services/map-search/map-search.service';
import { GeoPositionService } from 'src/app/core/services/geo-position/geo-position.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { HelperService } from 'src/app/core/services/helpers/helper.service';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { ExternalLinkService } from 'src/app/core/services/external-link/external-link.service';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular/standalone';

describe('MapCenterInfoComponent – visning av høyde og bratthet', () => {
  let component: MapCenterInfoComponent;
  let fixture: ComponentFixture<MapCenterInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MapCenterInfoComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: () => ({ getTranslation: () => of({}) }),
          },
        }),
      ],
      providers: [
        { provide: MapService, useValue: { followMode$: NEVER, relevantMapChangeWithInitialView$: NEVER } },
        { provide: GeoPositionService, useValue: { currentPosition$: NEVER } },
        { provide: UserSettingService, useValue: { userSetting$: of({ useMagneticBearing: true }) } },
        { provide: MapSearchService, useValue: {} },
        { provide: HelperService, useValue: { getDistanceText: () => '' } },
        { provide: LoggingService, useValue: { debug: (_msg: unknown) => undefined } },
        { provide: ExternalLinkService, useValue: {} },
        { provide: HttpClient, useValue: {} },
        { provide: ToastController, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MapCenterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function setValues(elevation: number | undefined, steepness: number | undefined): void {
    component.elevation.set(elevation);
    component.steepness.set(steepness);
    fixture.detectChanges();
  }

  function getElevationSteepnessRow(): HTMLElement | null {
    const rows = fixture.nativeElement.querySelectorAll('[name="map-center-info-row"]');
    // Første rad kan være stedsnavn, vi vil ha raden med høyde/bratthet
    for (const row of rows) {
      if (row.textContent?.includes('ABOVE_SEA_LEVEL') || row.querySelector('.steepness-triangle')) {
        return row;
      }
    }
    return null;
  }

  it('viser kun bratthet (ikke høyde eller komma) når høyde er undefined', () => {
    setValues(undefined, 30);
    const row = getElevationSteepnessRow();
    expect(row?.textContent).not.toContain('ABOVE_SEA_LEVEL');
    expect(row?.textContent).toContain('30');
    expect(row?.textContent).not.toContain(',');
  });

  it('viser kun høyde (ikke bratthet eller komma) når høyde er 0 moh', () => {
    setValues(0, 30);
    const row = getElevationSteepnessRow();
    expect(row?.textContent).toContain('0');
    expect(row?.textContent).toContain('ABOVE_SEA_LEVEL');
    expect(row?.querySelector('.steepness-triangle')).toBeNull();
    expect(row?.textContent).not.toContain(',');
  });

  it('viser kun høyde (ikke bratthet eller komma) når bratthet er undefined', () => {
    setValues(500, undefined);
    const row = getElevationSteepnessRow();
    expect(row?.textContent).toContain('500');
    expect(row?.textContent).toContain('ABOVE_SEA_LEVEL');
    expect(row?.querySelector('.steepness-triangle')).toBeNull();
    expect(row?.textContent).not.toContain(',');
  });

  it('viser høyde, komma og bratthet-symbol når begge er satt og høyde er over 0', () => {
    setValues(500, 30);
    const row = getElevationSteepnessRow();
    expect(row?.textContent).toContain('500');
    expect(row?.textContent).toContain('ABOVE_SEA_LEVEL');
    expect(row?.textContent).toContain(',');
    expect(row?.textContent).toContain('30');
    expect(row?.querySelector('.steepness-triangle')).not.toBeNull();
  });

  it('viser ingenting når verken høyde eller bratthet er satt', () => {
    setValues(undefined, undefined);
    expect(getElevationSteepnessRow()).toBeNull();
  });
});
