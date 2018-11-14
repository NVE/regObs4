import { Component, OnInit, Input, NgZone } from '@angular/core';
import { GeoHazard } from '../../../core/models/geo-hazard.enum';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { HelperService } from '../../../core/services/helpers/helper.service';
import { OfflineImageService } from '../../../core/services/offline-image/offline-image.service';
import { settings } from '../../../../settings';
import { RegistrationViewModel } from '../../../modules/regobs-api/models';

@Component({
  selector: 'app-observation-list-card',
  templateUrl: './observation-list-card.component.html',
  styleUrls: ['./observation-list-card.component.scss']
})
export class ObservationListCardComponent implements OnInit {
  @Input() obs: RegistrationViewModel;

  geoHazardName: string;
  dtObsDate: Date;
  icon: string;
  hasImage: boolean;
  imgSrc: string;
  settings = settings;
  header: string;
  selectedBadgeIndex = 0;

  constructor(
    private translateService: TranslateService,
    private helperService: HelperService,
    private offlineImageService: OfflineImageService,
    private ngZone: NgZone,
  ) { }

  async ngOnInit() {
    const geoHazard = this.obs.GeoHazardTID;
    this.geoHazardName = await this.translateService
      .get(`GEO_HAZARDS.${GeoHazard[geoHazard]}`.toUpperCase()).toPromise();
    this.ngZone.run(() => {
      this.header = this.getHeader(this.obs);
      this.dtObsDate = moment(this.obs.DtObsTime).toDate();
      this.icon = this.helperService.getGeoHazardIcon(geoHazard);
    });
    if (this.obs.Attachments.length > 0) {
      const url = await this.helperService.getObservationImage(this.obs.Attachments[0].PictureID);
      const imgageSource = await this.offlineImageService.getImageOrFallbackToUrl(url);
      this.ngZone.run(() => {
        this.imgSrc = imgageSource;
        this.hasImage = true;
      });
    }
  }

  setSelectedBadge(index: number) {
    this.ngZone.run(() => {
      this.selectedBadgeIndex = index;
    });
  }

  getHeader(obs: RegistrationViewModel) {
    const headerValues = [];
    if (obs.ObsLocation.MunicipalName) {
      headerValues.push(obs.ObsLocation.MunicipalName);
    } else if (obs.ObsLocation.LocationName) {
      headerValues.push(obs.ObsLocation.LocationName);
    }
    if (obs.ObsLocation.ForecastRegionName) {
      headerValues.push(obs.ObsLocation.ForecastRegionName);
    }
    return headerValues.join(' / ');
  }

  getRegistrationNames() {
    return this.obs.Summaries.map((reg) => reg.RegistrationName).join(', ');
  }
}
