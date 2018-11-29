import { Component, OnInit, Input, NgZone, OnDestroy, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { WarningGroup } from '../../core/services/warning/warning-group.model';
import { WarningService } from '../../core/services/warning/warning.service';
import { ToastController, ItemSliding, List } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { settings } from '../../../settings';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';

@Component({
  selector: 'app-cap-list-group',
  templateUrl: './cap-list-group.component.html',
  styleUrls: ['./cap-list-group.component.scss'],
})
export class CapListGroupComponent implements OnInit, OnDestroy {

  @Input() title: string;
  @Input() warnings$: Observable<WarningGroup[]>;

  @ViewChild('list') list: List;

  warnings: WarningGroup[] = [];
  warningSubscription: Subscription;
  currentGeoHazardSubscription: Subscription;
  animate: WarningGroup;
  currentGeoHazards$: Observable<GeoHazard[]>;
  GeoHazard = GeoHazard;
  showWarningLevel = false;

  constructor(
    private warningService: WarningService,
    private zone: NgZone,
    private toastController: ToastController,
    private userSettingService: UserSettingService,
    private inAppBrowser: InAppBrowser) {
  }

  ngOnInit() {
    this.currentGeoHazardSubscription = this.userSettingService.currentGeoHazardObservable$.subscribe((val) => {
      this.zone.run(() => {
        this.showWarningLevel = val.indexOf(GeoHazard.Ice) < 0;
      });
    });
    this.warningSubscription = this.warnings$.subscribe((val) => {
      this.zone.run(() => {
        if (this.warnings.length !== val.length) {
          this.closeSlidingItems();
          // NOTE: Workaround. A bug prevents sliding items from
          // beeing opened when items are open when updated.
        }
        this.warnings = val;
      });
    });
  }

  ngOnDestroy() {
    if (this.warningSubscription) {
      this.warningSubscription.unsubscribe();
    }
    if (this.currentGeoHazardSubscription) {
      this.currentGeoHazardSubscription.unsubscribe();
    }
  }

  closeSlidingItems() {
    return this.list.closeSlidingItems();
  }

  trackWarningGroup(index: number, group: WarningGroup) {
    return group ? `${group.key.groupId}_${group.key.geoHazard}` : undefined;
  }


  getDayWarning(group: WarningGroup, daysToAdd: number) {
    const day = moment().startOf('day').add(daysToAdd, 'days');
    const warning = group.getWarningForDay(day.toDate());
    if (warning) {
      return warning.warningLevel;
    }
    return 0;
  }

  getDayName(daysToAdd: number) {
    return `DAYS.SHORT.${moment().add(daysToAdd, 'days').day()}`;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      mode: 'md',
      duration: 2000
    });
    toast.present();
  }

  async toggleFavourite(group: WarningGroup) {
    if (group.isFavourite) {
      await this.warningService.removeFromFavourite(group.key.groupId, group.key.geoHazard);
      await this.presentToast(group.key.groupName + ' fjernet fra favoritter');
    } else {
      await this.warningService.addToFavourite(group.key.groupId, group.key.geoHazard);
      await this.presentToast(group.key.groupName + ' lagt til i favoritter');
    }

    this.animate = group;
    setTimeout(() => {
      this.zone.run(() => {
        this.animate = undefined;
      });
    }, 500);
  }

  async itemSwiped(group: WarningGroup) {
    await this.toggleFavourite(group);
  }

  async onDrag(event: Event) {
    const slider: ItemSliding = <any>event.srcElement;
    const openAmount = (await slider.getOpenAmount()) / 100.0;
    const option = <Element>event.srcElement.childNodes[2].childNodes[1];
    const opacity = openAmount > 1 ? 1 : (openAmount > 0 ? openAmount : 0);
    const color = `background-color:rgba(186,196,204,${opacity})`;
    option.setAttribute('style', color);
  }

  animateActive(group: WarningGroup) {
    return this.animate
      && group.key.groupId === this.animate.key.groupId
      && group.key.geoHazard === this.animate.key.geoHazard;
  }

  getUrl(group: WarningGroup) {
    if (group.url) {
      return group.url;
    } else {
      return settings.services.warning[GeoHazard[group.key.geoHazard]].webUrl
        .replace('{regionName}', group.key.groupName)
        .replace('{regionId}', group.key.groupId);
    }
  }

  navigateToWeb(event: Event, group: WarningGroup) {
    event.preventDefault();
    const iap = this.inAppBrowser.create(this.getUrl(group), '_system');
    iap.show();
  }

}
