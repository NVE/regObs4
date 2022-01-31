import { Injectable, Inject } from '@angular/core';
import { AppMode } from '../../models/app-mode.enum';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConfig } from '../../models/app-config.interface';
import { APP_CONFIG } from '../../models/app-config.interface';

@Injectable({
  providedIn: 'root'
})
export class AppModeService {

  public get appMode$(): Observable<AppMode> {
    return this.appModeSubject;
  }

  private appModeSubject: BehaviorSubject<AppMode>;

  constructor(@Inject(APP_CONFIG) config: AppConfig) {
    this.appModeSubject = new BehaviorSubject(config.appMode);
  }

  public setAppMode(appMode: AppMode): void {
    this.appModeSubject.next(appMode);
  }

}
