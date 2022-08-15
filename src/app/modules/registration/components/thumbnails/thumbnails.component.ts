import { Component, OnChanges, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { map, distinctUntilChanged, Observable, ReplaySubject } from 'rxjs';
import { AttachmentUploadEditModel, AttachmentUploadEditModelWithBlob, ExistingOrNewAttachment } from 'src/app/modules/common-registration/registration.models';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { RemoteOrLocalAttachmentEditModel } from 'src/app/core/services/draft/draft-model';
import { attachmentsComparator } from 'src/app/core/helpers/attachment-comparator';

/**
 * Show thumbnails of all images for given registration.
 */
@Component({
  selector: 'app-thumbnails',
  templateUrl: './thumbnails.component.html',
  styleUrls: ['./thumbnails.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbnailsComponent implements OnChanges, OnInit {
  @Input() attachments: ExistingOrNewAttachment[]; //attachments for given draft registration
  @Input() draftUuid: string;

  private attachmentsSubject = new ReplaySubject<ExistingOrNewAttachment[]>(1);

  newAttachments$: Observable<AttachmentUploadEditModelWithBlob[]>;
  existingAttachments$: Observable<RemoteOrLocalAttachmentEditModel[]>;

  constructor(
    private newAttachmentService: NewAttachmentService
  ) {}

  ngOnInit(): void {
    this.newAttachments$ = this.attachmentsSubject.pipe(
      map(attachments => attachments.filter(a => a.type === 'new')),
      map(attachments => attachments.map(a => a.attachment as AttachmentUploadEditModel)),
      distinctUntilChanged((prev, curr) => attachmentsComparator(prev, curr, 'id')),
      this.newAttachmentService.addBlobs(this.draftUuid)
    );

    this.existingAttachments$ = this.attachmentsSubject.pipe(
      map(attachments => attachments.filter(a => a.type === 'existing')),
      map(attachments => attachments.map(a => a.attachment as RemoteOrLocalAttachmentEditModel)),
      distinctUntilChanged((prev, curr) => attachmentsComparator(prev, curr, 'AttachmentId'))
    );
  }

  trackExisting(index: number, attachment: RemoteOrLocalAttachmentEditModel) {
    return attachment.AttachmentId;
  }

  trackNew(index: number, attachment: AttachmentUploadEditModelWithBlob) {
    return attachment.id;
  }

  ngOnChanges() {
    if (this.attachments != null) {
      this.attachmentsSubject.next(this.attachments);
    }
  }
}