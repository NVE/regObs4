import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NewAttachmentService, RegistrationService as CommonRegistrationService } from 'src/app/modules/common-registration/registration.services';
import { combineLatest, from } from 'rxjs';
import { IRegistration, RegistrationTid, SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { UserGroupService } from '../../../../core/services/user-group/user-group.service';
import { GeoHazard } from '@varsom-regobs-common/core';
import { ISummaryItem } from '../../components/summary-item/summary-item.model';
import { ActivatedRoute } from '@angular/router';
import { SummaryItemService } from '../../services/summary-item.service';
import { distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';
import deepEqual from 'fast-deep-equal';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewPage extends NgDestoryBase implements OnInit {
  registration: IRegistration;
  RegistationTid = RegistrationTid;
  GeoHazard = GeoHazard;
  RegistrationStatus = SyncStatus;
  summaryItems: Array<ISummaryItem> = [];

  get regiatration$() {
    const id = this.activatedRoute.snapshot.params['id'];
    return this.commonRegistrationService.getRegistrationByIdShared$(id);
  }

  constructor(
    private commonRegistrationService: CommonRegistrationService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private summaryItemService: SummaryItemService,
    private userGroupService: UserGroupService,
    private newAttachmentService: NewAttachmentService
  ) {
    super();
  }

  ngOnInit() {
    this.regiatration$.pipe(takeUntil(this.ngDestroy$)).subscribe((registration) => {
      this.registration = registration;
      this.cdr.detectChanges();
    });
    this.initSummaryItemSubscription();
    this.userGroupService.updateUserGroups();
  }

  private initSummaryItemSubscription() {
    this.regiatration$
      .pipe(
        switchMap((reg) =>
          combineLatest([this.userGroupService.getUserGroupsAsObservable(), this.newAttachmentService.getUploadedAttachments(reg.id)]).pipe(
            switchMap(([userGroups]) => from(this.summaryItemService.getSummaryItems(reg, userGroups)))
          )
        ),
        distinctUntilChanged((a, b) => deepEqual(a, b)),
        takeUntil(this.ngDestroy$)
      )
      .subscribe((summaryItems) => {
        this.summaryItems = summaryItems;
        this.cdr.detectChanges();
      });
  }

  trackByFunction(index: number, item: ISummaryItem) {
    if (!item) {
      return null;
    }
    return item.href;
  }
}
