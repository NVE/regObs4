import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  getDistanceText(distanceInMeter: number, numDecimals = 1): string {
    const options = {
      minimumFractionDigits: numDecimals,
      maximumFractionDigits: numDecimals,
    };
    if (distanceInMeter > 1000) {
      return `${(distanceInMeter / 1000).toLocaleString(undefined, options)}  km`;
    } else {
      return `${(distanceInMeter || 0).toFixed(0)} m`;
    }
  }

  formatMsToTime(duration: number, showMilliseconds = false) {
    const milliseconds = Math.floor((duration % 1000) / 100);
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    return (
      `${hours < 10 ? '0' + hours : hours}` +
      `:${minutes < 10 ? '0' + minutes : minutes}` +
      `:${seconds < 10 ? '0' + seconds : seconds}` +
      (showMilliseconds ? `.${milliseconds}` : '')
    );
  }

  humanReadableByteSize(bytes: number, fractionDigits = 1, si = true) {
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
    return bytes.toFixed(fractionDigits) + ' ' + units[u];
  }
}
