import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { map, tap } from 'rxjs/operators';
import {
  RegistrationViewModel,
  StratProfileLayerViewModel,
  SearchService
} from '@varsom-regobs-common/regobs-api';
import { Observable, pipe } from 'rxjs';
import moment from 'moment';
import { GeoHazard } from '@varsom-regobs-common/core';
import { RegistrationTid, IRegistration } from '@varsom-regobs-common/registration';
import { RegistrationService } from '../../../../../services/registration.service';

@Component({
  selector: 'app-strat-profile-layer-history-modal',
  templateUrl: './strat-profile-layer-history-modal.page.html',
  styleUrls: ['./strat-profile-layer-history-modal.page.scss']
})
export class StratProfileLayerHistoryModalPage implements OnInit {
  @Input() observerGuid: string;
  @Input() reg: IRegistration;

  isLoading = true;

  $previousUsedLayers: Observable<
    { id: number; date: string; layers: StratProfileLayerViewModel[] }[]
  >;

  constructor(
    private modalController: ModalController,
    private registrationService: RegistrationService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    if (this.reg && this.reg.request && this.reg.request.ObsLocation) {
      this.$previousUsedLayers = this.searchService
        .SearchSearch({
          ObserverGuid: this.observerGuid,
          FromDtObsTime: moment().subtract(14, 'days').startOf('day').toISOString(),
          Radius: {
            Position: {
              Latitude: this.reg.request.ObsLocation.Latitude,
              Longitude: this.reg.request.ObsLocation.Longitude
            },
            Radius: 100000
          },
          SelectedGeoHazards: [GeoHazard.Snow],
          SelectedRegistrationTypes: [
            {
              Id: RegistrationTid.SnowProfile2
            }
          ]
        })
        .pipe(
          map((result) => this.getLayersFromSearchResult(result)),
          tap(() => {
            this.isLoading = false;
          })
        );
    }
  }

  cancel() {
    this.modalController.dismiss();
  }

  async selectLayer(item: {
    id: number;
    date: string;
    layers: StratProfileLayerViewModel[];
  }) {
    if (!this.reg.request.SnowProfile2) {
      this.reg.request.SnowProfile2 = {};
    }

    if (!this.reg.request.SnowProfile2.StratProfile) {
      this.reg.request.SnowProfile2.StratProfile = {};
    }
    this.reg.request.SnowProfile2.StratProfile.Layers = item.layers;
    await this.registrationService.saveRegistrationAsync(this.reg);
    this.modalController.dismiss();
  }

  private getLayersFromSearchResult(
    result: RegistrationViewModel[]
  ): { id: number; date: string; layers: StratProfileLayerViewModel[] }[] {
    return result
      .map((reg) => {
        if (
          reg.SnowProfile2 !== undefined &&
          reg.SnowProfile2.StratProfile !== undefined &&
          reg.SnowProfile2.StratProfile !== null &&
          reg.SnowProfile2.StratProfile.Layers !== undefined &&
          reg.SnowProfile2.StratProfile.Layers !== null &&
          reg.SnowProfile2.StratProfile.Layers.length > 0
        ) {
          return {
            id: reg.RegId,
            date: reg.DtObsTime,
            layers: reg.SnowProfile2.StratProfile.Layers
          };
        }
        return null;
      })
      .filter((x) => x !== null);
  }
}
