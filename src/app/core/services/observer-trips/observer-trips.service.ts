import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { combineLatest, debounceTime, firstValueFrom } from 'rxjs';
import { RegobsAuthService } from 'src/app/modules/auth/services/regobs-auth.service';
import { TripService } from 'src/app/modules/common-regobs-api';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import type { FeatureCollection } from 'geojson';
import { GeoJSONService } from '../geojson/geojson.service';
import { NetworkStatusService } from '../network-status/network-status.service';

const msOneWeek = 604800000;
export const observerTripsGeoJsonId = 'observer-trips';

const shouldUpdate = (mTime: number) => {
  const msSinceUpdate = Date.now() - mTime;
  return msSinceUpdate > msOneWeek;
};

const DEBUG_TAG = 'ObserverTrips';

/**
 * Provides geojson data for observer trips, and a toggle mechanism that can be used to show/hide data.
 * If data is toggled off, geojson will be null.
 * If user does not have access (401 is returned from API), geojson will be null.
 * If user logs out, cached geojson data will be deleted and geojson will be null.
 */
@Injectable({
  providedIn: 'root',
})
export class ObserverTripsService {
  private backendApi = inject(TripService);
  private logger = inject(LoggingService);
  private geojson = inject(GeoJSONService);
  private authService = inject(RegobsAuthService);
  private network = inject(NetworkStatusService);

  init() {
    this.logger.debug('Initialize observer trips service');
    combineLatest([this.authService.loggedInUser$, this.network.connected$])
      .pipe(debounceTime(4000))
      .subscribe(([user, connected]) => {
        if (user.isLoggedIn && connected) {
          this.fetchData();
        } else if (!user.isLoggedIn) {
          this.removeData();
        }
      });
  }

  private async persistData(data: FeatureCollection): Promise<void> {
    await this.geojson.save(
      {
        id: observerTripsGeoJsonId,
        name: 'Observatørturer',
        comment:
          'Fullstendig info om turene finnes kun på web (gravepunkt, riktige farger i henhold til terrengklasse osv). Vi håper å kunne vise også dette i appen etter hvert.',
        date: Date.now(),
        visibleOnMap: true,
      },
      data
    );
  }

  private async removeData() {
    await this.geojson.remove(observerTripsGeoJsonId);
  }

  private async fetchData(): Promise<void> {
    const metadata = this.geojson.metadata().find((x) => x.id === observerTripsGeoJsonId);
    if (metadata && !shouldUpdate(metadata.date)) {
      this.logger.debug('Data is fresh, no update needed');
      return;
    }

    this.logger.debug('Fetching', DEBUG_TAG);

    let data: FeatureCollection;
    try {
      // Appearantly TripGet is missing typing
      data = (await firstValueFrom(this.backendApi.TripGet())) as unknown as FeatureCollection;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === HttpStatusCode.Unauthorized) {
          this.logger.debug('User does not have access to observertrips', DEBUG_TAG);
          await this.removeData();
          return;
        }
      }

      this.logger.error(error, DEBUG_TAG, 'Could not fetch observertrips');
      return;
    }

    await this.persistData(data);
  }
}
