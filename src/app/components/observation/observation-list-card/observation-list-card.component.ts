import { Component, OnInit, Input } from '@angular/core';
import { RegObsObservation } from '../../../core/models/regobs-observation.model';
import { GeoHazard } from '../../../core/models/geo-hazard.enum';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { HelperService } from '../../../core/services/helpers/helper.service';

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

  constructor(private translateService: TranslateService, private helperService: HelperService) { }

  async ngOnInit() {
    this.geoHazardName = await this.translateService.get(`GEO_HAZARDS.${GeoHazard[this.obs.GeoHazardTid]}`.toUpperCase()).toPromise();
    this.dtObsDate = moment(this.obs.DtObsTime).toDate();
    this.icon = this.helperService.getGeoHazardIcon(this.obs.GeoHazardTid);
    if (this.obs.Pictures.length > 0) {
      this.imgSrc = await this.helperService.getObservationImage(this.obs.Pictures[0].TypicalValue2);
      this.hasImage = true;
    }
  }
}
