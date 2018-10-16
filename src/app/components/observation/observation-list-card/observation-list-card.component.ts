import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { RegObsObservation } from '../../../core/models/regobs-observation.model';
import { GeoHazard } from '../../../core/models/geo-hazard.enum';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { HelperService } from '../../../core/services/helpers/helper.service';
import { OfflineImageService } from '../../../core/services/offline-image/offline-image.service';
import { settings } from '../../../../settings';

@Component({
  selector: 'app-observation-list-card',
  templateUrl: './observation-list-card.component.html',
  styleUrls: ['./observation-list-card.component.scss']
})
export class ObservationListCardComponent implements OnInit {
  @Input() obs: RegObsObservation;

  geoHazardName: string;
  dtObsDate: Date;
  icon: string;
  hasImage: boolean;
  imgSrc: string;
  settings = settings;

  constructor(
    private translateService: TranslateService,
    private helperService: HelperService,
    private offlineImageService: OfflineImageService,
  ) { }

  async ngOnInit() {
    this.geoHazardName = await this.translateService.get(`GEO_HAZARDS.${GeoHazard[this.obs.GeoHazardTid]}`.toUpperCase()).toPromise();
    this.dtObsDate = moment(this.obs.DtObsTime).toDate();
    this.icon = this.helperService.getGeoHazardIcon(this.obs.GeoHazardTid);
    if (this.obs.Pictures.length > 0) {
      const url = await this.helperService.getObservationImage(this.obs.Pictures[0].TypicalValue2);
      this.imgSrc = await this.offlineImageService.getImageOrFallbackToUrl(url);
      this.hasImage = true;
    }
  }

  getRegistrationNames() {
    return this.obs.Registrations.map((reg) => reg.RegistrationName).join(', ');
  }
}
