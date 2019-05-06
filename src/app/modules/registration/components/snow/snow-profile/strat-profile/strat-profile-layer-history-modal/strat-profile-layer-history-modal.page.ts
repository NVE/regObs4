import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchService } from '../../../../../../regobs-api/services';
import { map, tap, switchMap } from 'rxjs/operators';
import { RegistrationViewModel, StratProfileLayerViewModel, StratProfileLayerDto } from '../../../../../../regobs-api/models';
import { Observable } from 'rxjs';
import { ObsLocation } from '../../../../../models/obs-location.model';
import * as moment from 'moment';
import { GeoHazard } from '../../../../../../../core/models/geo-hazard.enum';
import { RegistrationTid } from '../../../../../models/registrationTid.enum';
import { UserSettingService } from '../../../../../../../core/services/user-setting/user-setting.service';
import { settings } from '../../../../../../../../settings';

@Component({
  selector: 'app-strat-profile-layer-history-modal',
  templateUrl: './strat-profile-layer-history-modal.page.html',
  styleUrls: ['./strat-profile-layer-history-modal.page.scss'],
})
export class StratProfileLayerHistoryModalPage implements OnInit {

  @Input() observerGuid: string;
  @Input() obsLocation: ObsLocation;

  isLoading = true;

  $previousUsedLayers: Observable<{ id: number, date: string, layers: StratProfileLayerViewModel[] }[]>;

  constructor(
    private modalController: ModalController,
    private searchService: SearchService,
    private userSettingService: UserSettingService) { }

  ngOnInit() {
    this.$previousUsedLayers = this.userSettingService.userSettingObservable$.pipe(switchMap((us) => {
      this.searchService.rootUrl = settings.services.regObs.apiUrl[us.appMode];
      return this.searchService.SearchSearch({
        ObserverGuid: this.observerGuid,
        FromDate: moment().subtract(14, 'days').startOf('day').toISOString(),
        Radius: {
          Position: {
            Latitude: this.obsLocation.Latitude,
            Longitude: this.obsLocation.Longitude,
          },
          Radius: 100000,
        },
        SelectedGeoHazards: [GeoHazard.Snow],
        SelectedRegistrationTypes: [{
          Id: RegistrationTid.SnowProfile2
        }]
      });
    }), map((result) => this.getLayersFromSearchResult(result)), tap(() => {
      this.isLoading = false;
    }));
  }

  cancel() {
    this.modalController.dismiss();
  }

  selectLayer(item: { id: number, date: string, layers: StratProfileLayerViewModel[] }) {
    this.modalController.dismiss(this.convertToStratProfileLayerDto(item.layers));
  }

  convertToStratProfileLayerDto(layer: StratProfileLayerViewModel[]): StratProfileLayerDto[] {
    if (!layer) {
      return [];
    }
    return layer.map((vm) => ({
      GrainSizeAvg: vm.GrainSizeAvg,
      HardnessTID: vm.HardnessTID,
      GrainFormPrimaryTID: vm.GrainFormPrimaryTID,
      GrainFormSecondaryTID: vm.GrainFormSecondaryTID,
      Thickness: vm.Thickness,
      GrainSizeAvgMax: vm.GrainSizeAvgMax,
      HardnessBottomTID: vm.HardnessBottomTID,
      WetnessTID: vm.WetnessTID,
      CriticalLayerTID: vm.CriticalLayerTID,
      Comment: vm.Comment,
    }));
  }

  private getLayersFromSearchResult(result: RegistrationViewModel[]): { id: number, date: string, layers: StratProfileLayerViewModel[] }[] {
    return result.map((reg) => {
      if (
        reg.SnowProfile2 !== undefined &&
        reg.SnowProfile2.StratProfile !== undefined &&
        reg.SnowProfile2.StratProfile.Layers !== undefined &&
        reg.SnowProfile2.StratProfile.Layers.length > 0) {
        return {
          id: reg.RegID,
          date: reg.DtObsTime,
          layers: reg.SnowProfile2.StratProfile.Layers,
        };
      }
      return null;
    }).filter((x) => x !== null);
  }
}
