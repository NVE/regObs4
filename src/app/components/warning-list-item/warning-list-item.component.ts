import { Component, OnInit, Input, NgZone, ViewChild } from '@angular/core';
import { IonItemSliding, ToastController } from '@ionic/angular';
import { WarningGroup } from '../../core/services/warning/warning-group.model';
import { ExternalLinkService } from '../../core/services/external-link/external-link.service';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { settings } from '../../../settings';
import { WarningService } from '../../core/services/warning/warning.service';

@Component({
  selector: 'app-warning-list-item',
  templateUrl: './warning-list-item.component.html',
  styleUrls: ['./warning-list-item.component.scss']
})
export class WarningListItemComponent implements OnInit {

  @Input() warningGroup: WarningGroup;
  animate: WarningGroup;
  GeoHazard = GeoHazard;

  @ViewChild(IonItemSliding) itemSlide: IonItemSliding;

  constructor(
    private externalLinkService: ExternalLinkService,
    private warningService: WarningService,
    private zone: NgZone,
    private toastController: ToastController) { }

  ngOnInit() {
  }

  async onDrag(event: Event) {
    const slider: IonItemSliding = <any>event.srcElement;
    const openAmount = (await slider.getOpenAmount()) / 100.0;
    const option = <Element>event.srcElement.childNodes[2].childNodes[1];
    const opacity = openAmount > 1 ? 1 : (openAmount > 0 ? openAmount : 0);
    const color = `background-color:rgba(186,196,204,${opacity})`;
    option.setAttribute('style', color);
  }

  async toggleFavourite(group: WarningGroup) {
    if (group.isFavourite) {
      await this.warningService.removeFromFavourite(group.key.groupId, group.key.geoHazard);
      await this.presentToast(group.key.groupName + ' fjernet fra favoritter');
    } else {
      await this.warningService.addToFavourite(group.key.groupId, group.key.geoHazard);
      await this.presentToast(group.key.groupName + ' lagt til i favoritter');
    }

    setTimeout(() => {
      if (this.itemSlide) {
        this.itemSlide.close();
      }
    }, 500);
    // this.animate = group;
    // setTimeout(() => {
    //   this.zone.run(() => {
    //     this.animate = undefined;
    //   });
    // }, 500);
  }

  // animateActive(group: WarningGroup) {
  //   return this.animate
  //     && group.key.groupId === this.animate.key.groupId
  //     && group.key.geoHazard === this.animate.key.geoHazard;
  // }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      mode: 'md',
      duration: 2000
    });
    toast.present();
  }

  async itemSwiped(group: WarningGroup) {
    await this.toggleFavourite(group);
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
    this.externalLinkService.openExternalLink(this.getUrl(group));
  }

}
