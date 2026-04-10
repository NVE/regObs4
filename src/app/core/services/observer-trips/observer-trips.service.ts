import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { debounceTime, distinctUntilKeyChanged, firstValueFrom, skipWhile, switchMap, take } from 'rxjs';
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
 * Downloads observer trips geojson data, if you have access.
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
    this.logger.debug('Initialize observer trips service', DEBUG_TAG);
    this.authService.loggedInUser$
      .pipe(
        distinctUntilKeyChanged('isLoggedIn'),
        debounceTime(5000),
        switchMap((user) => {
          // Bruker er ikke logget inn - slett eventuelle data som finnes
          if (!user.isLoggedIn) {
            return this.removeData();
          }

          // Bruker er logget inn, vent på nettverk og hent obsturer
          return this.network.connected$.pipe(
            // Vent på at vi har nettverk
            skipWhile((connected) => !connected),
            take(1),
            // Hent obsturer
            switchMap(() => this.fetchData())
          );
        })
      )
      .subscribe();
  }

  private async persistData(data: FeatureCollection): Promise<void> {
    await this.geojson.save(
      {
        id: observerTripsGeoJsonId,
        name: 'Observatørturer',
        comment:
          'Fullstendig info om turene (gravepunkt, riktige farger i henhold til terrengklasse osv) finnes kun via NVE Temakart. Vi håper å kunne vise også dette i appen etter hvert.',
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
      this.logger.debug('Data is fresh, no update needed', DEBUG_TAG);
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
