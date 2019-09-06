import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { TranslateService } from '@ngx-translate/core';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';
import { GeoHelperService } from '../../../modules/shared/services/geo-helper/geo-helper.service';
import { GeoHazard } from '../../models/geo-hazard.enum';

const DEBUG_TAG = 'ShortcutService';
const FLAG_ACTIVITY_CLEAR_TOP = 67108864;

@Injectable({
  providedIn: 'root'
})

export class ShortcutService {

  constructor(
    private platform: Platform,
    private loggingService: LoggingService,
    private translateService: TranslateService,
    private geoHelperService: GeoHelperService,
  ) {

  }

  init() {
    const w = (<any>window);
    if (this.platform.is('cordova') && this.platform.is('android') && w.plugins && w.plugins.Shortcuts) {
      this.initAndroidShortcusts();
      return;
    }
    this.loggingService.debug('Dynamic shortcuts not supported', DEBUG_TAG);
  }

  private getImage(geoHazard: GeoHazard) {
    switch (geoHazard) {
      case GeoHazard.Snow:
        return 'ic_snow';
      case GeoHazard.Dirt:
        return 'ic_dirt';
      case GeoHazard.Ice:
        return 'ic_ice';
      case GeoHazard.Water:
        return 'ic_water';
    }
  }

  private async getShortcuts() {
    const geoHazards = this.geoHelperService.getAllGeoHazards();
    const geoHazardsKeys = this.geoHelperService.getTranslationKeys(geoHazards);
    const translations = await this.translateService.get([
      'ADD_MENU.NEW_OBSERVATION',
      'MAP_ITEM_BAR.OBSERVATION',
      ...geoHazardsKeys
    ]).toPromise();

    const getLongLabelTranslation = (geoHazardName: string) =>
      `${translations['ADD_MENU.NEW_OBSERVATION']} ${geoHazardName.toLowerCase()} ${translations['MAP_ITEM_BAR.OBSERVATION']}`;
    const getShortLabel = (geoHazardName: string) => `+ ${geoHazardName}`;

    return geoHazards.map((geoHazard) => ({
      id: `regobs_shortcut_new_registration_${geoHazard}`,
      url: `regobs://app/registration/new/${geoHazard}`,
      shortLabel: getShortLabel(translations[this.geoHelperService.getTranslationKey(geoHazard)]),
      longLabel: getLongLabelTranslation(translations[this.geoHelperService.getTranslationKey(geoHazard)]),
      iconFromResource: this.getImage(geoHazard),
    }));
  }


  private initAndroidShortcusts() {
    this.loggingService.debug('Initializing dynamic shortcuts for Android', DEBUG_TAG);
    const w = (<any>window);
    w.plugins.Shortcuts.supportsDynamic(async (supported) => {
      if (!supported) {
        this.loggingService.debug('Dynamic shortcuts not supported', DEBUG_TAG);
        return;
      }
      const shortcuts = await this.getShortcuts();
      const shortcutsFull = shortcuts.map((s) => ({
        ...s,
        intent: {
          action: 'android.intent.action.VIEW',
          flags: FLAG_ACTIVITY_CLEAR_TOP, // FLAG_ACTIVITY_CLEAR_TOP
          data: s.url, // Must be a well-formed URI
        }
      }));
      this.loggingService.debug('Adding dynamic shortcuts:', DEBUG_TAG, shortcutsFull);
      w.plugins.Shortcuts.setDynamic(shortcutsFull, () => {
        this.loggingService.debug('Shortcuts were applied successfully', DEBUG_TAG);
      }, (error) => {
        this.loggingService.log('Error setting dynamic shortcuts!', error, LogLevel.Warning, DEBUG_TAG);
      });
    }, (error) => {
      this.loggingService.log('Error when checking support for dynamic shortcuts!', error, LogLevel.Warning, DEBUG_TAG);
    });
  }
}
