import { Component, OnChanges, ChangeDetectionStrategy, OnInit, inject, input } from '@angular/core';
import { ISummaryItem } from './summary-item.model';
import { IonIcon, IonItem, IonLabel, NavController } from '@ionic/angular/standalone';
import { map, distinctUntilChanged, Observable, ReplaySubject } from 'rxjs';
import {
  AttachmentUploadEditModel,
  AttachmentUploadEditModelWithBlob,
  ExistingOrNewAttachment,
} from 'src/app/modules/common-registration/registration.models';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { RemoteOrLocalAttachmentEditModel } from 'src/app/core/services/draft/draft-model';
import { attachmentsComparator } from 'src/app/core/helpers/attachment-comparator';
import { NgIf, NgClass } from '@angular/common';
import { ThumbnailsComponent } from '../thumbnails/thumbnails.component';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { checkmarkCircle } from 'ionicons/icons';

@Component({
  selector: 'app-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonIcon, IonItem, IonLabel, NgClass, NgIf, ThumbnailsComponent, TranslatePipe],
})
export class SummaryItemComponent implements OnChanges, OnInit {
  private navController = inject(NavController);
  // private newAttachmentService = inject(NewAttachmentService);

  readonly item = input.required<ISummaryItem>();
  readonly readonly = input(false);
  readonly simpleObsMode = input(false);

  private attachments = new ReplaySubject<ExistingOrNewAttachment[]>(1);

  // newAttachments$: Observable<AttachmentUploadEditModelWithBlob[]>;
  // existingAttachments$: Observable<RemoteOrLocalAttachmentEditModel[]>;

  constructor() {
    addIcons({ checkmarkCircle });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // TODO: Images
  // ngOnInit(): void {
  //   this.newAttachments$ = this.attachments.pipe(
  //     map((attachments) => attachments.filter((a) => a.type === 'new')),
  //     map((attachments) => attachments.map((a) => a.attachment as AttachmentUploadEditModel)),
  //     distinctUntilChanged((prev, curr) => attachmentsComparator(prev, curr, 'id')),
  //     this.newAttachmentService.addBlobs(this.item().uuid)
  //   );

  //   this.existingAttachments$ = this.attachments.pipe(
  //     map((attachments) => attachments.filter((a) => a.type === 'existing')),
  //     map((attachments) => attachments.map((a) => a.attachment as RemoteOrLocalAttachmentEditModel)),
  //     distinctUntilChanged((prev, curr) => attachmentsComparator(prev, curr, 'AttachmentId'))
  //   );
  // }

  trackExisting(index: number, attachment: RemoteOrLocalAttachmentEditModel) {
    return attachment.AttachmentId;
  }

  trackNew(index: number, attachment: AttachmentUploadEditModelWithBlob) {
    return attachment.id;
  }

  ngOnChanges() {
    const item = this.item();
    if (item?.attachments != null) {
      this.attachments.next(item.attachments);
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
    if (!this.readonly()) {
      this.navController.navigateForward([this.item().href, this.item().uuid], {
        queryParams: this.item().queryParams,
      });
    }
  }
}
