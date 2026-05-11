import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  Injector,
  viewChild,
} from '@angular/core';
import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRefresher,
  IonRefresherContent,
  LoadingController,
  ModalController,
  IonSplitPane,
  IonMenu,
  IonButtons,
  IonMenuButton,
  IonIcon,
  IonTitle,
} from '@ionic/angular/standalone';
import { tap, combineLatest, map, firstValueFrom } from 'rxjs';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import { SearchRegistrationService } from 'src/app/core/services/search-registration/search-registration.service';
import { SearchRegistrationsWithAttachments } from 'src/app/modules/common-regobs-api/models/search-registrations-with-attachments';
import { ErrorStateComponent } from '../error-state/error-state.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { ListControlsComponent } from '../list-controls/list-controls.component';
import { GridImageComponent } from './grid-image.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { UpdateObservationsService } from 'src/app/modules/side-menu/components/update-observations/update-observations.service';
import { ObservationImageCarouselComponent } from 'src/app/components/observation/observation-image-carousel/observation-image-carousel.component';
import { AttachmentViewModel, SearchService } from 'src/app/modules/common-regobs-api';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { CarouselItems } from 'src/app/components/observation/observation-image-carousel/models';
import { FilterMenuComponent } from 'src/app/modules/side-menu/components/filter-menu/filter-menu.component';
import { HeaderComponent } from 'src/app/modules/shared/components/header/header.component';
import { AddMenuComponent } from 'src/app/modules/shared/components/add-menu/add-menu.component';

const DEBUG_TAG = 'ImageList';

/**
 * Bildesøk
 */
@Component({
  selector: 'app-image-list',
  imports: [
    IonContent,
    IonRefresher,
    IonRefresherContent,
    ErrorStateComponent,
    EmptyStateComponent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    ListControlsComponent,
    GridImageComponent,
    TranslatePipe,
    IonSplitPane,
    IonMenu,
    FilterMenuComponent,
    HeaderComponent,
    IonButtons,
    IonMenuButton,
    IonIcon,
    IonTitle,
    AddMenuComponent,
  ],
  templateUrl: './image-list.component.html',
  styleUrl: './image-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageListComponent {
  private searchCriteriaService = inject(SearchCriteriaService);
  private searchService = inject(SearchService);
  private modalController = inject(ModalController);
  private searchRegistrations = inject(SearchRegistrationService);
  private infiniteScroll = viewChild(IonInfiniteScroll);
  private ionRefresher = viewChild(IonRefresher);
  private updateObservationsService = inject(UpdateObservationsService);
  private translateService = inject(TranslateService);
  private loadingController = inject(LoadingController);
  private logger = inject(LoggingService);
  private injector = inject(Injector);

  private searchHandler = this.searchRegistrations.searchAttachments(toObservable(this.searchCriteriaService.criteria));
  attCount = this.searchHandler.attachmentCount.asReadonly();

  private gridElement = viewChild.required<ElementRef<HTMLDivElement>>('grid');

  constructor() {
    this.updateObservationsService.refreshRequested$?.pipe(takeUntilDestroyed()).subscribe(() => {
      this.refresh(); // oppfrisk sida når bruker trykker på oppfrisk-knappen i menyen
    });
  }

  /**
   * Sjekker om innholdet i grid er kortere enn vindushøyden, og laster i så fall flere bilder. Vi viser bilder kun fra
   * 10 observasjoner om gangen. Hvis bildene fra 10 observasjoner ikke dekker hele skjermen, vil infinite scroll
   * aldri trigges ved scroll og derfor man kan ikke laste ned flere bilder.
   */
  checkAndLoadMoreImages() {
    const attCount = this.attCount() || 0;
    // Sammenligner antall nedlastede vedlegg med totalt antall vedlegg
    if (this.currentlyDownloadedAttachments().length < attCount) {
      const windowHeight = window.innerHeight;
      const gridHeight = this.gridElement().nativeElement.getBoundingClientRect().height;
      if (gridHeight < windowHeight && !this.disableInfiniteScroll()) {
        this.logger.debug('image grid height < window height, loading more images', DEBUG_TAG, {
          gridHeight,
          windowHeight,
        });
        this.loadNextPage();
      }
    }
  }

  registrations = toSignal(
    this.searchHandler.registrations$.pipe(
      tap(() => {
        this.infiniteScroll()?.complete();
        this.ionRefresher()?.complete();
        this.updateObservationsService.setLastFetched(new Date());
        // Kjører checkAndLoadMoreImages etter grid er oppdatert i DOM for å sørge for at skjermen fylles opp
        afterNextRender(
          {
            read: () => {
              this.checkAndLoadMoreImages();
            },
          },
          { injector: this.injector }
        );
      })
    ),
    { initialValue: [] as SearchRegistrationsWithAttachments[] }
  );

  currentlyDownloadedAttachments = computed(() => this.registrations().flatMap((reg) => reg.Attachments || []));

  disableInfiniteScroll = toSignal(
    combineLatest([this.searchHandler.allFetchedForCriteria$, this.searchHandler.maxItemsFetched$]).pipe(
      map(([allFetched, maxReached]) => allFetched || maxReached)
    ),
    { initialValue: false }
  );

  isLoading = toSignal(this.searchHandler.isFetching$, { initialValue: false });
  maxItemsFetched = toSignal(this.searchHandler.maxItemsFetched$, { initialValue: false });
  error = toSignal(this.searchHandler.error$, { initialValue: { hasError: false } });

  loadNextPage() {
    this.searchHandler.increasePage();
  }

  refresh() {
    this.searchHandler.update();
  }

  async openImageCarousel(attachmentUrl: string | undefined, regId: number, attachments: AttachmentViewModel[]) {
    if (!attachmentUrl) return;
    const message = this.translateService.instant('DATA_LOAD.DATA');
    const loader = await this.loadingController.create({
      message,
      backdropDismiss: true,
    });
    await loader.present();

    const attachmentIndex = attachments.findIndex((attachment) => attachment.Url === attachmentUrl);
    const registration = await firstValueFrom(this.searchService.SearchSearch({ RegId: regId }));
    const items: CarouselItems = attachments.map((a) => ({ type: 'Attachment', data: a }));
    const modal = await this.modalController.create({
      component: ObservationImageCarouselComponent,
      cssClass: 'fullscreen-modal',
      componentProps: {
        index: attachmentIndex,
        items,
        registration: registration[0],
      },
    });
    await modal.present();
    this.loadingController.dismiss();
  }
}
