import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { TripService } from 'src/app/modules/common-regobs-api';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { isAndroidOrIos } from '../../helpers/ionic/platform-helper';

const msOneWeek = 604800000;

const getDataPath = async () => {
  const uri = await Filesystem.getUri({
    path: 'obsturer.json',
    directory: Directory.Data
  });
  return uri.uri;
};

const getLastModifiedTime = async (path: string) => {
  const result = await Filesystem.stat({
    path,
  });
  return result.mtime;
};

const shouldUpdate = (mTime: number) => {
  const msSinceUpdate = Date.now() - mTime;
  return msSinceUpdate > msOneWeek;
};

const saveFile = async (path: string, data: string) => {
  await Filesystem.writeFile({
    path,
    data,
    encoding: Encoding.UTF8,
  });
};

const readFile = async (path: string) => {
  return await Filesystem.readFile({
    path,
    encoding: Encoding.UTF8,
  });
};

const DEBUG_TAG = 'ObserverTrips';

@Injectable({
  providedIn: 'root'
})
export class ObserverTripsService {
  constructor(
    private tripService: TripService,
    private logger: LoggingService,
    private platform: Platform
  ) {}

  async getData() {
    let path: string;

    if (!isAndroidOrIos(this.platform)) {
      return await this.fetchData();
    } else {
      path = await getDataPath();
      this.logger.debug('Path', DEBUG_TAG, path);

      let fileExists = false;
      let tryUpdate = true;
      let mTime: number;

      try {
        mTime = await getLastModifiedTime(path);
        fileExists = mTime != null;
        this.logger.debug('Last modified time', DEBUG_TAG, { mTime, fileExists });
      } catch (error) {
        this.logger.error(error, DEBUG_TAG, 'Could not get mtime, probably not existing');
      }

      if (fileExists) {
        tryUpdate = shouldUpdate(mTime);
      }

      this.logger.debug('Try update?', DEBUG_TAG, tryUpdate);

      if (tryUpdate) {
        const data = await this.fetchData();

        if (data != null) {
          this.logger.debug('Saving data', DEBUG_TAG);
          try {
            await saveFile(path, JSON.stringify(data));
          } catch (error) {
            this.logger.error(error, DEBUG_TAG, 'Could not save data', { path, data });
            fileExists = false;
          }
        }

        if (!fileExists) {
          return data;
        }
      }

      const result = await readFile(path);
      return JSON.parse(result.data);
    }
  }

  private async fetchData() {
    this.logger.debug('Fetching', DEBUG_TAG);

    let data: any;
    try {
      data = await firstValueFrom(this.tripService.TripGet());
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === HttpStatusCode.Unauthorized) {
          this.logger.debug('User does not have access to observertrips', DEBUG_TAG);
          return null;
        }
      }
      this.logger.error(error, DEBUG_TAG, 'Could not fetch observertrips');
      return null;
    }

    this.logger.debug('Got observer trips response', DEBUG_TAG);
    return data;
  }
}