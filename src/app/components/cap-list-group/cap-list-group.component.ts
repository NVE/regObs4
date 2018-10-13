import { Component, OnInit, Input, NgZone, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { WarningGroup } from '../../core/services/warning/warning-group.model';
import { WarningService } from '../../core/services/warning/warning.service';
import { ToastController, ItemSliding, ItemOption, ItemOptions } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-cap-list-group',
  templateUrl: './cap-list-group.component.html',
  styleUrls: ['./cap-list-group.component.scss'],
})
export class CapListGroupComponent implements OnInit, OnDestroy {

  @Input() title: string;
  @Input() warnings$: Observable<WarningGroup[]>;

  warnings: WarningGroup[];
  subscription: Subscription;

  animate: WarningGroup;

  constructor(private warningService: WarningService, private zone: NgZone,
    private toastController: ToastController) {
  }

  ngOnInit() {
    this.subscription = this.warnings$.subscribe((val) => {
      this.zone.run(() => {
        this.warnings = val;
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  trackWarningGroup(index: number, group: WarningGroup) {
    return group ? `${group.group.groupId}_${group.group.geoHazard}` : undefined;
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
      await this.warningService.removeFromFavourite(group.group.groupId, group.group.geoHazard);
      await this.presentToast(group.group.groupName + ' fjernet fra favoritter');
    } else {
      await this.warningService.addToFavourite(group.group.groupId, group.group.geoHazard);
      await this.presentToast(group.group.groupName + ' lagt til i favoritter');
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
      && group.group.groupId === this.animate.group.groupId
      && group.group.geoHazard === this.animate.group.geoHazard;
  }

}
