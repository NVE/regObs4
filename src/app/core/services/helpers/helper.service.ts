import { Injectable } from '@angular/core';
import { UserSettingService } from '../user-setting.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private userSettingService: UserSettingService) { }

  async getObservationsFromDate(): Promise<moment.Moment> {
    const userSettings = await this.userSettingService.getUserSettings();
    const daysBackForCurrentGeoHazard = userSettings.observationDaysBack
      .find((setting) => setting.geoHazard === userSettings.currentGeoHazard);
    const daysBack = daysBackForCurrentGeoHazard ? daysBackForCurrentGeoHazard.daysBack : 3; // default to 3 days back if not found
    return moment().subtract(daysBack, 'days').startOf('day');
  }
}
