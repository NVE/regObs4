import { Component, ChangeDetectionStrategy, inject, input, computed } from '@angular/core';
import { map, distinctUntilChanged } from 'rxjs';
import {
  AttachmentUploadEditModel,
  ExistingOrNewAttachment,
} from 'src/app/modules/common-registration/registration.models';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { RemoteOrLocalAttachmentEditModel } from 'src/app/core/services/draft/draft-model';
import { attachmentsComparator } from 'src/app/core/helpers/attachment-comparator';
import { BlobImageComponent } from '../blob-image/blob-image.component';
import { RemoteImageComponent } from '../../../shared/components/remote-image/remote-image.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { injectUuidFromRouteParameters } from 'src/app/core/services/draft/get-uuid';

/**
 * Show thumbnails of all images for given registration.
 */
@Component({
  selector: 'app-thumbnails',
  templateUrl: './thumbnails.component.html',
  styleUrls: ['./thumbnails.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BlobImageComponent, RemoteImageComponent],
})
export class ThumbnailsComponent {
  private newAttachmentService = inject(NewAttachmentService);

  readonly attachments = input<ExistingOrNewAttachment[]>(); //attachments for given draft registration

  uuid = injectUuidFromRouteParameters();

  private attachments$ = toObservable(this.attachments).pipe(map((a) => a || []));
  private newAttachments$ = this.attachments$.pipe(
    map((attachments) => attachments.filter((a) => a.type === 'new')),
    map((attachments) => attachments.map((a) => a.attachment as AttachmentUploadEditModel)),
    distinctUntilChanged((prev, curr) => attachmentsComparator(prev, curr, 'id')),
    this.newAttachmentService.addBlobs(this.uuid)
  );
  private existingAttachments$ = this.attachments$.pipe(
    map((attachments) => attachments.filter((a) => a.type === 'existing')),
    map((attachments) => attachments.map((a) => a.attachment as RemoteOrLocalAttachmentEditModel)),
    distinctUntilChanged((prev, curr) => attachmentsComparator(prev, curr, 'AttachmentId'))
  );

  newAttachments = toSignal(this.newAttachments$, { initialValue: [] });
  existingAttachments = toSignal(this.existingAttachments$, { initialValue: [] });
  private totalImagesCount = computed(() => this.newAttachments().length + this.existingAttachments().length);
  hiddenImagesCount = computed(() => this.totalImagesCount() - 3);
}
