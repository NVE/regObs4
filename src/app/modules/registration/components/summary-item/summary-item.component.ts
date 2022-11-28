import { Component, OnChanges, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ISummaryItem } from './summary-item.model';
import { NavController } from '@ionic/angular';
import { map, distinctUntilChanged, Observable, ReplaySubject } from 'rxjs';
import { AttachmentUploadEditModel, AttachmentUploadEditModelWithBlob, ExistingOrNewAttachment } from 'src/app/modules/common-registration/registration.models';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { RemoteOrLocalAttachmentEditModel } from 'src/app/core/services/draft/draft-model';
import { attachmentsComparator } from 'src/app/core/helpers/attachment-comparator';

@Component({
  selector: 'app-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryItemComponent implements OnChanges, OnInit {
  @Input() item: ISummaryItem;
  @Input() readonly = false;
  @Input() simpleObsMode = false;

  private attachments = new ReplaySubject<ExistingOrNewAttachment[]>(1);

  newAttachments$: Observable<AttachmentUploadEditModelWithBlob[]>;
  existingAttachments$: Observable<RemoteOrLocalAttachmentEditModel[]>;

  constructor(
    private navController: NavController,
    private newAttachmentService: NewAttachmentService,
  ) {}

  ngOnInit(): void {
    this.newAttachments$ = this.attachments.pipe(
      map(attachments => attachments.filter(a => a.type === 'new')),
      map(attachments => attachments.map(a => a.attachment as AttachmentUploadEditModel)),
      distinctUntilChanged((prev, curr) => attachmentsComparator(prev, curr, 'id')),
      this.newAttachmentService.addBlobs(this.item.uuid)
    );

    this.existingAttachments$ = this.attachments.pipe(
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
    if (this.item?.attachments != null) {
      this.attachments.next(this.item.attachments);
    }
  }

  // TODO: Delete if not needed
  // convertFileSrc(fileUrl: string): SafeUrl {
  //   return this.domSanitizer.bypassSecurityTrustUrl(
  //     fileUrl.startsWith('blob')
  //       ? fileUrl
  //       : this.webView.convertFileSrc(fileUrl)
  //   );
  // }

  navigate() {
    if (!this.readonly) {
      this.navController.navigateForward([this.item.href, this.item.uuid], {
        queryParams: this.item.queryParams
      });
    }
  }
}
