import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';

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

   constructor(private draftRepository: DraftRepositoryService) {
   }

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
}

