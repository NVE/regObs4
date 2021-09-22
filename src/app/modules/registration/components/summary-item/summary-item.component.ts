import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ISummaryItem } from './summary-item.model';
import { NavController } from '@ionic/angular';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';
import { forkJoin, map, of, switchMap, take, takeUntil, catchError } from 'rxjs';
import { AttachmentUploadEditModel } from 'src/app/modules/common-registration/registration.models';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { AttachmentUploadEditModelWithBlob } from '../add-picture-item/add-picture-item.component';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'SummaryItemComponent';
@Component({
  selector: 'app-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryItemComponent extends NgDestoryBase implements OnInit {
  @Input() item: ISummaryItem;
  @Input() readonly = false;

  attachments: AttachmentUploadEditModelWithBlob[];

  constructor(private navController: NavController, private newAttachmentService: NewAttachmentService, private cdr: ChangeDetectorRef, private logger: LoggingService) {
    super();
  }

  ngOnInit() {
    of(this.item.attachments)
      .pipe(
        map((attachments) => attachments.filter((a) => a.type === 'new').map((a) => a.attachment as AttachmentUploadEditModel)),
        switchMap((attachments) =>
          forkJoin([
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
          ])
        ),
        takeUntil(this.ngDestroy$)
      )
      .subscribe((result) => {
        this.attachments = result;
        this.cdr.detectChanges();
      });
  }

  navigate() {
    if (!this.readonly) {
      this.navController.navigateForward([this.item.href, this.item.id], {
        queryParams: this.item.queryParams
      });
    }
  }
}
