import { Component, OnInit, Input } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { catchError, map, tap } from 'rxjs/operators';
import {
  RegistrationViewModel,
  SearchCriteriaExclUserRequestDto,
  StratProfileLayerViewModel,
} from 'src/app/modules/common-regobs-api/models';
import { SearchService } from 'src/app/modules/common-regobs-api/services';
import { Observable, of } from 'rxjs';
import moment from 'moment';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { HeaderColorDirective } from '../../../../../../shared/directives/header-color/header-color.directive';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { FormatDatePipe } from '../../../../../../shared/pipes/format-date/format-date.pipe';

@Component({
  selector: 'app-strat-profile-layer-history-modal',
  templateUrl: './strat-profile-layer-history-modal.page.html',
  styleUrls: ['./strat-profile-layer-history-modal.page.scss'],
  imports: [
    AsyncPipe,
    FormatDatePipe,
    HeaderColorDirective,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonSkeletonText,
    IonTitle,
    IonToolbar,
    NgFor,
    NgIf,
    TranslatePipe,
  ],
})
export class StratProfileLayerHistoryModalPage implements OnInit {
  @Input() draft: RegistrationDraft;

  isLoading = true;

  $previousUsedLayers: Observable<{ id: number; date: string; layers: StratProfileLayerViewModel[] }[]>;

  constructor(
    private modalController: ModalController,
    private draftRepository: DraftRepositoryService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    if (this.draft?.registration?.ObsLocation) {
      this.$previousUsedLayers = this.searchService.SearchPostSearchMyRegistrations(this.criteria).pipe(
        map((result) => this.getLayersFromSearchResult(result)),
        tap(() => {
          this.isLoading = false;
        }),
        catchError(() => of([])) // Return empty list if http request fails);
      );
    }
  }

  cancel() {
    this.modalController.dismiss();
  }

  private get criteria(): SearchCriteriaExclUserRequestDto {
    return {
      FromDtObsTime: moment().subtract(14, 'days').startOf('day').toISOString(),
      Radius: {
        Position: {
          Latitude: this.draft.registration.ObsLocation.Latitude,
          Longitude: this.draft.registration.ObsLocation.Longitude,
        },
        Radius: 100000,
      },
      SelectedGeoHazards: [GeoHazard.Snow],
      SelectedRegistrationTypes: [
        {
          Id: RegistrationTid.SnowProfile2,
        },
      ],
    };
  }

  async selectLayer(item: { id: number; date: string; layers: StratProfileLayerViewModel[] }) {
    if (!this.draft.registration.SnowProfile2) {
      this.draft.registration.SnowProfile2 = {};
    }

    if (!this.draft.registration.SnowProfile2.StratProfile) {
      this.draft.registration.SnowProfile2.StratProfile = {};
    }
    this.draft.registration.SnowProfile2.StratProfile.Layers = item.layers;
    await this.draftRepository.save(this.draft);
    this.modalController.dismiss();
  }

  private getLayersFromSearchResult(
    result: RegistrationViewModel[]
  ): { id: number; date: string; layers: StratProfileLayerViewModel[] }[] {
    return result
      .map((reg) => {
        if (reg.SnowProfile2?.StratProfile?.Layers?.length > 0) {
          return {
            id: reg.RegId,
            date: reg.DtObsTime,
            layers: reg.SnowProfile2.StratProfile.Layers,
          };
        }
        return null;
      })
      .filter((x) => x !== null);
  }
}
