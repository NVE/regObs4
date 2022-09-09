import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RegistrationDraft} from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { DangerObsEditModel } from 'src/app/modules/common-regobs-api';

/**
 * Simplified snow registration schema.
 * This is a compound form of a few elements from different snow schemas
 */
@Component({
  selector: 'app-simple-snow-obs',
  templateUrl: './simple-snow-obs.component.html',
  styleUrls: ['./simple-snow-obs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleSnowObsComponent implements OnInit {
   @Input() draft: RegistrationDraft;

   /**
    * Return TID's from snow danger sign obserations in the draft
    */
   get dangerSignTIDs(): number[] {
     const tids: number[] = [];
     const dangerObservations = this.draft.registration.DangerObs;
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
     this.draft.registration.DangerObs = dangerObservations;
   }

   constructor(private draftRepository: DraftRepositoryService) {}

   async ngOnInit(): Promise<void> {
     if (this.draft.registration.SnowSurfaceObservation == null) {
       this.draft.registration.SnowSurfaceObservation = {};
     }
     if (this.draft.registration.DangerObs == null) {
       this.draft.registration.DangerObs = [];
     }
   }

   async save(): Promise<void> {
     this.draftRepository.save(this.draft);
   }

   filterSnowSurfaceTIDs = (tid: number): boolean => {
     return tid !== 108; //we don't want to show "Other"
   }

   filterDangerSignTIDs = (tid: number): boolean => {
     return ![1, 99].includes(tid); //we don't want to show "No danger sign observed" and "Other"
   }
}

