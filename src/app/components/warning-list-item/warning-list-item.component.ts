import { Component, OnInit, Input, ViewChild, Renderer2, Inject } from '@angular/core';
import { IonItemSliding, DomController, IonItemOption } from '@ionic/angular';
import { WarningGroup } from '../../core/services/warning/warning-group.model';
import { ExternalLinkService } from '../../core/services/external-link/external-link.service';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { settings } from '../../../settings';
import * as moment from 'moment';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { LangKey } from '../../core/models/langKey';
import { WarningGroupFavouriteToggleComponent } from '../warning-group-favourite-toggle/warning-group-favourite-toggle.component';

@Component({
  selector: 'app-warning-list-item',
  templateUrl: './warning-list-item.component.html',
  styleUrls: ['./warning-list-item.component.scss']
})
export class WarningListItemComponent implements OnInit {

  @Input() warningGroup: WarningGroup;
  GeoHazard = GeoHazard;

  @ViewChild(IonItemSliding) itemSlide: IonItemSliding;
  @ViewChild(IonItemOption) itemOption: IonItemOption;
  @ViewChild(WarningGroupFavouriteToggleComponent) favouriteToggle: WarningGroupFavouriteToggleComponent;

  constructor(
    private externalLinkService: ExternalLinkService,
    private userSettingService: UserSettingService,
    private domCtrl: DomController,
    private renderer: Renderer2) { }

  ngOnInit() {
  }

  async onDrag(event: Event) {
    this.favouriteToggle.startSubscription();
    const slider: IonItemSliding = <any>event.srcElement;
    const openAmount = (await slider.getOpenAmount()) / 100.0;
    const opacity = openAmount > 1 ? 1 : (openAmount > 0 ? openAmount : 0);
    const color = `rgba(186,196,204,${opacity})`;
    this.favouriteToggle.setOpen(opacity);

    this.domCtrl.write(() => {
      this.renderer.setStyle((<any>this.itemSlide).el, 'background-color', color);
    });
  }

  toggleFavourite() {
    this.favouriteToggle.toggle();
    setTimeout(() => {
      if (this.itemSlide) {
        this.itemSlide.close();
      }
    }, 1000);
  }

  itemSwiped() {
    this.toggleFavourite();
  }

  async getUrl(group: WarningGroup) {
    if (group.url) {
      return group.url;
    } else {
      const userSettings = await this.userSettingService.getUserSettings();
      const url = settings.services.warning[GeoHazard[group.key.geoHazard]].webUrl[LangKey[userSettings.language]];
      if (url) {
        return url
          .replace('{regionName}', group.key.groupName)
          .replace('{regionId}', group.key.groupId);
      } else {
        return null;
      }
    }
  }

  async navigateToWeb(event: Event, group: WarningGroup) {
    event.preventDefault();
    const url = await this.getUrl(group);
    if (url) {
      this.externalLinkService.openExternalLink(url);
    }
  }

  async navigateToWebByDay(event: Event, group: WarningGroup, day: number) {
    event.preventDefault();
    const dateString = moment().startOf('day').add(day, 'days')
      .format(settings.services.warning.dateFormat);
    const url = await this.getUrl(group);
    if (url) {
      this.externalLinkService.openExternalLink(`${url}${dateString}`);
    }
  }

}
