import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LoggingService } from '../../../services/logging/logging.service';
import { Observable, combineLatest, distinctUntilChanged, map, tap } from 'rxjs';
import { SearchRegistrationsWithAttachments } from 'src/app/modules/common-regobs-api/models/search-registrations-with-attachments';
import { PagedSearchResult } from 'src/app/core/services/search-registration/search-registration.service';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { AttachmentViewModel } from 'src/app/modules/common-regobs-api';
import { FullscreenImageModalPage } from 'src/app/pages/modal-pages/fullscreen-image-modal/fullscreen-image-modal.page';

@Component({
  selector: 'app-images-grid',
  templateUrl: './images-grid.component.html',
  styleUrls: ['./images-grid.component.scss'],
})
export class ImagesGridComponent implements OnInit {
  @Input() attachmentsResult: PagedSearchResult<SearchRegistrationsWithAttachments>;
  attachments$: Observable<SearchRegistrationsWithAttachments[]>;
  shouldDisableScroller$: Observable<boolean>;
  isFetchingAttachments$: Observable<boolean>;
  // fakeArray to show more components when the skeleton loads
  fakeArray = new Array(30);
  refreshFunc = this.refresh.bind(this);
  @ViewChild(IonInfiniteScroll, { static: false }) scroll: IonInfiniteScroll;
  constructor(private logger: LoggingService, private modalController: ModalController) {}

  ngOnInit() {
    this.shouldDisableScroller$ = combineLatest([
      this.attachmentsResult.allFetchedForCriteria$,
      this.attachmentsResult.maxItemsFetched$,
    ]).pipe(
      map(([allFetched, maxReached]) => allFetched || maxReached),
      distinctUntilChanged()
    );
    this.attachments$ = this.attachmentsResult.registrations$.pipe(tap(() => this.scroll && this.scroll.complete()));
    this.isFetchingAttachments$ = this.attachmentsResult.isFetching$;
  }

  loadNextPage(): void {
    this.attachmentsResult.increasePage();
  }

  refresh(): void {
    this.logger.debug('Refresh', 'PagedSearchResult');
    this.attachmentsResult.resetPaging();
  }

  async openImage(index: number, attachments: AttachmentViewModel[], regId: number): Promise<void> {
    const modal = await this.modalController.create({
      component: FullscreenImageModalPage,
      cssClass: 'modal-fullscreen',
      componentProps: {
        allImages: attachments,
        imgIndex: index,
        href: { title: 'REGISTRATION.GO_TO', url: `registration/${regId}` },
      },
    });
    modal.present();
  }
}
