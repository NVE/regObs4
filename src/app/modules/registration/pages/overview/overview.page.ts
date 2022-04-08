import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { UserGroupService } from '../../../../core/services/user-group/user-group.service';
import { ISummaryItem } from '../../components/summary-item/summary-item.model';
import { ActivatedRoute } from '@angular/router';
import { SummaryItemService } from '../../services/summary-item.service';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewPage implements OnInit {
  summaryItems$: Observable<Array<ISummaryItem>>;
  draft$: Observable<RegistrationDraft>;

  constructor(
    private draftService: DraftRepositoryService,
    private activatedRoute: ActivatedRoute,
    private summaryItemService: SummaryItemService,
    private userGroupService: UserGroupService,
  ) {}

  ngOnInit() {
    const uuid = this.activatedRoute.snapshot.params['id'];
    this.draft$ = this.draftService.getDraft$(uuid);
    this.summaryItems$ = this.summaryItemService.getSummaryItems$(uuid);
    this.userGroupService.updateUserGroups();
  }

  draftHasStatusSync(draft: RegistrationDraft): boolean {
    return draft?.syncStatus === SyncStatus.Sync || draft?.syncStatus === SyncStatus.SyncAndIgnoreVersionCheck;
  }

  trackByFunction(index: number, item: ISummaryItem) {
    if (!item) {
      return null;
    }
    return item.href;
  }
}
