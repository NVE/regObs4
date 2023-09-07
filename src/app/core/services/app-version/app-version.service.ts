import { AppVersion } from '../../models/app-version.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as version from '../../../../environments/version.json';

/**
 * Provides version info for this app
 */
@Injectable({
  providedIn: 'root',
})
export class AppVersionService {
  private appVersion = new BehaviorSubject<AppVersion>(version);
  readonly appVersion$: Observable<AppVersion> = this.appVersion.asObservable();
}
