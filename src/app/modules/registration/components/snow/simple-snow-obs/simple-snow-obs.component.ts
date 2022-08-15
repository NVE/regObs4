import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { map, Observable } from 'rxjs';
import { RegistrationDraft, RemoteOrLocalAttachmentEditModel } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { ExistingOrNewAttachment } from 'src/app/modules/common-registration/registration.models';
import { DangerObsEditModel } from 'src/app/modules/common-regobs-api';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { SummaryItemService } from '../../../services/summary-item.service';

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

   snowSurfaceAttachments$: Observable<ExistingOrNewAttachment[]>;
   dangerSignAttachments$: Observable<ExistingOrNewAttachment[]>;

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

   constructor(
    private draftRepository: DraftRepositoryService,
    private summaryItemService: SummaryItemService
   ) {}

   async ngOnInit(): Promise<void> {
     if (this.draft.registration.SnowSurfaceObservation == null) {
       this.draft.registration.SnowSurfaceObservation = {};
     }
     if (this.draft.registration.DangerObs == null) {
       this.draft.registration.DangerObs = [];
     }

     const attachments$ = this.summaryItemService.createAttachments$(this.draft.uuid);
     this.dangerSignAttachments$ = attachments$.pipe(
       map(attachments => attachments.filter(attachment => attachment.attachment.RegistrationTID === 13))
     );
     this.snowSurfaceAttachments$ = attachments$.pipe(
       map(attachments => attachments.filter(attachment => attachment.attachment.RegistrationTID === 22))
     );
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

