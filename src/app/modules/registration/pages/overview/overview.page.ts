import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { combineLatest, from, Observable } from 'rxjs';
import { RegistrationTid, SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { UserGroupService } from '../../../../core/services/user-group/user-group.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { ISummaryItem } from '../../components/summary-item/summary-item.model';
import { ActivatedRoute } from '@angular/router';
import { SummaryItemService } from '../../services/summary-item.service';
import { distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';
import deepEqual from 'fast-deep-equal';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewPage extends NgDestoryBase implements OnInit {
  draft: RegistrationDraft
  RegistationTid = RegistrationTid;
  GeoHazard = GeoHazard;
  RegistrationStatus = SyncStatus;
  summaryItems: Array<ISummaryItem> = [];
  private draft$: Observable<RegistrationDraft>;

  constructor(
    private draftService: DraftRepositoryService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private summaryItemService: SummaryItemService,
    private userGroupService: UserGroupService,
    private newAttachmentService: NewAttachmentService,
    private navController: NavController,
  ) {
    super();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];

    this.draft$ = this.draftService.getDraft$(id);

    this.draft$.pipe(takeUntil(this.ngDestroy$)).subscribe((draft) => {
      this.draft = draft;
      this.cdr.detectChanges();
    });

    this.initSummaryItemSubscription();
    this.userGroupService.updateUserGroups();
  }

  private initSummaryItemSubscription() {
    this.draft$
      .pipe(
        switchMap((draft) =>
          combineLatest([
            this.userGroupService.getUserGroupsAsObservable(),
            this.newAttachmentService.getAttachments(draft.uuid)
          ]).pipe(
            switchMap(([userGroups]) => from(this.summaryItemService.getSummaryItems(draft, userGroups)))
          )
        ),
        distinctUntilChanged((a, b) => deepEqual(a, b)),
        takeUntil(this.ngDestroy$)
      )
      .subscribe({
        next: (summaryItems) => {
          this.summaryItems = summaryItems;
          this.cdr.detectChanges();
        },
        complete: () => {
          // Draft has been deleted / this registration does not exist any more, we should navigate to front page
          this.navController.navigateRoot('');
        }
      });
  }

  trackByFunction(index: number, item: ISummaryItem) {
    if (!item) {
      return null;
    }
    return item.href;
  }
}
