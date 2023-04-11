import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';

/**
 * Simplified water registration schema.
 */
@Component({
  selector: 'app-simple-water-obs',
  templateUrl: './simple-water-obs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleWaterObsComponent implements OnInit {
  @Input() draft: RegistrationDraft;

  constructor(private draftRepository: DraftRepositoryService) {}
  ngOnInit(): void {
    if (!this.draft.registration.GeneralObservation) {
      this.draft.registration.GeneralObservation = {};
    }
  }

  async save(): Promise<void> {
    this.draftRepository.save(this.draft);
  }
}
