import { IonList } from '@ionic/angular/standalone';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { DangerObsEditModel, SnowSurfaceEditModel } from 'src/app/modules/common-regobs-api';
import { KdvIconSelectComponent } from '../../kdv-icon-select/kdv-icon-select.component';
import { EditImagesBarComponent } from './edit-images-bar/edit-images-bar.component';
import { NumericInputComponent } from '../../numeric-input/numeric-input.component';

/**
 * Simplified snow registration schema.
 * This is a compound form of a few elements from different snow schemas
 */
@Component({
  selector: 'app-simple-snow-obs',
  templateUrl: './simple-snow-obs.component.html',
  styleUrls: ['./simple-snow-obs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EditImagesBarComponent, IonList, KdvIconSelectComponent, NumericInputComponent],
})
export class SimpleSnowObsComponent {
  private draftRepository = inject(DraftRepositoryService);

  readonly draft = input.required<RegistrationDraft>();

  get registration() {
    return this.draft().registration;
  }

  // skiConditions = computed(() => this.draft().registration.SnowSurfaceObservation?.SkiConditionsTID);
  // snowSurface = computed(() => this.draft().registration.SnowSurfaceObservation?.SnowSurfaceTID);
  // dangerSigns = computed(() => (this.draft().registration.DangerObs || []).map((ds) => ds.DangerSignTID));

  // updateSkiConditions(tid: SnowSurfaceEditModel['SkiConditionsTID']) {
  //   this.updateSnowSurface({ SkiConditionsTID: tid });
  // }

  // private updateSnowSurface(values: Partial<SnowSurfaceEditModel>) {
  //   this.draft.update((draft) => {
  //     return {
  //       ...draft,
  //       registration: {
  //         ...draft.registration,
  //         SnowSurfaceObservation: {
  //           ...(draft.registration.SnowSurfaceObservation || {}),
  //           ...values,
  //         },
  //       },
  //     };
  //   });
  // }

  /**
   * Return TID's from snow danger sign obserations in the draft
   */
  get dangerSignTIDs(): number[] {
    const tids: number[] = [];
    const dangerObservations = this.registration.DangerObs;
    dangerObservations?.filter((obs) => obs.GeoHazardTID == GeoHazard.Snow).map((obs) => tids.push(obs.DangerSignTID));
    return tids;
  }

  /**
   * Maps danger sign TID's to complete snow danger sign observations in the draft
   */
  set dangerSignTIDs(dangerSignTIDs: number[]) {
    const dangerObservations: DangerObsEditModel[] = [];
    if (dangerSignTIDs != null) {
      for (const tid of dangerSignTIDs) {
        dangerObservations.push({ DangerSignTID: tid, GeoHazardTID: GeoHazard.Snow });
      }
    }
    this.registration.DangerObs = dangerObservations;
  }

  /**
   * Nullsafe getter. Will create an empty snow surface obs if needed
   */
  get snowSurfaceObservation(): SnowSurfaceEditModel {
    if (this.registration.SnowSurfaceObservation == null) {
      this.registration.SnowSurfaceObservation = {};
    }
    return this.registration.SnowSurfaceObservation;
  }

  async save(): Promise<void> {
    this.draftRepository.save({
      ...this.draft(),
      registration: this.registration,
    });
  }

  filterSnowSurfaceTIDs = (tid: number): boolean => {
    return ![108, 109, 110].includes(tid); //we don't want to show "... water drainage lines" and "Other"
  };

  filterDangerSignTIDs = (tid: number): boolean => {
    return ![1, 99].includes(tid); //we don't want to show "No danger sign observed" and "Other"
  };
}
