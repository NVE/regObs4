import { Injectable } from '@angular/core';
import { GeoHazard } from '../../models/geo-hazard.enum';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  getDistanceText(distanceInMeter: number): string {
    if (distanceInMeter > 1000) {
      return `${(distanceInMeter / 1000).toFixed(1)}  km`;
    } else {
      return `${(distanceInMeter || 0).toFixed(0)} m`;
    }
  }

  formatMsToTime(duration: number, showMilliseconds: boolean = false) {
    const milliseconds = Math.floor((duration % 1000) / 100);
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    return `${(hours < 10) ? '0' + hours : hours}`
      + `:${(minutes < 10) ? '0' + minutes : minutes}`
      + `:${(seconds < 10) ? '0' + seconds : seconds}`
      + (showMilliseconds ? `.${milliseconds}` : '');
  }

  getGeoHazardIcon(geoHazard: GeoHazard) {
    switch (geoHazard) {
      case GeoHazard.Dirt:
        return '/assets/icon/dirt_circle.svg';
      case GeoHazard.Ice:
        return '/assets/icon/ice_circle.svg';
      case GeoHazard.Snow:
        return '/assets/icon/snow_circle.svg';
      case GeoHazard.Water:
        return '/assets/icon/water_circle.svg';
    }
  }

  humanReadableByteSize(bytes: number, si: boolean = true) {
    const thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }
    const units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    do {
      bytes /= thresh;
      ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
  }
}
