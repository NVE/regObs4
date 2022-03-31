import { Component, OnChanges, Input, ChangeDetectionStrategy } from '@angular/core';
import { ISummaryItem } from './summary-item.model';
import { NavController } from '@ionic/angular';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';
import { forkJoin, map, of, switchMap, take, catchError, distinctUntilChanged, Observable, ReplaySubject } from 'rxjs';
import { AttachmentUploadEditModel, ExistingOrNewAttachment } from 'src/app/modules/common-registration/registration.models';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { AttachmentUploadEditModelWithBlob } from '../add-picture-item/add-picture-item.component';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { RemoteOrLocalAttachmentEditModel } from 'src/app/core/services/draft/draft-model';


function attachmentsComparator<T>(previous: T[], current: T[], key: keyof T): boolean {
  if (previous.length !== current.length) {
    return false;
  }
  const previousIds = previous.map(a => a[key]).sort();
  const currentIds = previous.map(a => a[key]).sort();
  return previousIds.every((id, index) => id == currentIds[index]);
}


const DEBUG_TAG = 'SummaryItemComponent';
@Component({
  selector: 'app-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryItemComponent extends NgDestoryBase implements OnChanges {
  @Input() item: ISummaryItem;
  @Input() readonly = false;

  private attachments = new ReplaySubject<ExistingOrNewAttachment[]>();

  newAttachments$: Observable<AttachmentUploadEditModelWithBlob[]> = this.attachments.pipe(
    map(attachments => attachments.filter(a => a.type === 'new')),
    map(attachments => attachments.map(a => a.attachment as AttachmentUploadEditModel)),
    distinctUntilChanged((prev, curr) => attachmentsComparator(prev, curr, 'id')),
    switchMap((attachments: AttachmentUploadEditModel[]) => attachments.length === 0 ? of([]) : forkJoin([
      ...attachments.map((a) =>
        this.newAttachmentService.getBlob(this.item.id, a.id).pipe(
          take(1),
          map((blob) => ({ ...a, blob })),
          catchError((err) => {
            this.logger.error(err, DEBUG_TAG, 'Could not get blob from attachment');
            return of({ ...a, blob: undefined });
          })
        )
      )
    ]))
  );

  trackExisting(index: number, attachment: RemoteOrLocalAttachmentEditModel) {
    return attachment.AttachmentId;
  }

  trackNew(index: number, attachment: AttachmentUploadEditModelWithBlob) {
    return attachment.id;
  }

  existingAttachments$: Observable<RemoteOrLocalAttachmentEditModel[]> = this.attachments.pipe(
    map(attachments => attachments.filter(a => a.type === 'existing')),
    map(attachments => attachments.map(a => a.attachment as RemoteOrLocalAttachmentEditModel)),
    distinctUntilChanged((prev, curr) => attachmentsComparator(prev, curr, 'AttachmentId'))
  );

  constructor(
    private navController: NavController,
    private newAttachmentService: NewAttachmentService,
    private logger: LoggingService
  ) {
    super();
  }

  ngOnChanges() {
    if (this.item?.attachments != null) {
      this.attachments.next(this.item.attachments);
    }
  }

  navigate() {
    if (!this.readonly) {
      this.navController.navigateForward([this.item.href, this.item.id], {
        queryParams: this.item.queryParams
      });
    }
  }
}
