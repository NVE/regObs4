import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { DangerObsEditModel, SnowSurfaceEditModel } from 'src/app/modules/common-regobs-api';

/**
 * Simplified water registration schema.
 */
@Component({
  selector: 'app-simple-water-obs',
  templateUrl: './simple-water-obs.component.html',
  styleUrls: ['./simple-water-obs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleWaterObsComponent {
  @Input() draft: RegistrationDraft;

  constructor(private draftRepository: DraftRepositoryService) {}

  async save(): Promise<void> {
    this.draftRepository.save(this.draft);
  }
}
