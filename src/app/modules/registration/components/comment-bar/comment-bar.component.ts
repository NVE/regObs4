import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import stringify from 'json-stringify-safe';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { RegistrationTid } from 'src/app/modules/common-registration/models/registration-tid.enum';
import { getRegistrationName } from 'src/app/modules/common-registration/registration.helpers';
import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'CommentBarComponent';

@Component({
  selector: 'app-comment-bar',
  templateUrl: './comment-bar.component.html',
  styleUrls: ['./comment-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentBarComponent {
  @Input() draft: RegistrationDraft;
  @Input() registrationTid = 10;

  regName: string;
  commentName: string;
  comment: string;
  reg: { Comment: string; ObsComment: string };

  constructor(
    private modalController: ModalController,
    private draftRepository: DraftRepositoryService,
    private logger: LoggingService
  ) {
    this.regName = getRegistrationName(this.registrationTid);
    this.commentName = this.registrationTid == RegistrationTid.GeneralObservation ? 'ObsComment' : 'Comment';
    console.log(this.draft);
  }

  onChange(comment: string) {
    if (!this.draft.registration?.[this.regName]) {
      this.draft.registration[this.regName] = {};
    }
    this.draft.registration[this.regName][this.commentName] = comment;
    this.draftRepository.save({ ...this.draft, syncStatus: SyncStatus.Draft });
  }
}
