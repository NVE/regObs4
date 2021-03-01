import {
  Component,
  OnInit,
  OnDestroy,
  NgZone
} from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { RegistrationService as CommonRegistrationService, SyncStatus } from '@varsom-regobs-common/registration';
import { Subscription, combineLatest, from } from 'rxjs';
import { IRegistration, RegistrationTid } from '@varsom-regobs-common/registration';
import { UserGroupService } from '../../../../core/services/user-group/user-group.service';
import { GeoHazard } from '@varsom-regobs-common/core';
import { ISummaryItem } from '../../components/summary-item/summary-item.model';
import { ActivatedRoute } from '@angular/router';
import { SummaryItemService } from '../../services/summary-item.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss']
})
export class OverviewPage implements OnInit, OnDestroy {
  registration: IRegistration;
  RegistationTid = RegistrationTid;
  GeoHazard = GeoHazard;
  RegistrationStatus = SyncStatus;
  summaryItems: Array<ISummaryItem> = [];
  private summarySubscription: Subscription;
  private registrationSubscription: Subscription;

  get regiatration$() {
    const id = this.activatedRoute.snapshot.params['id'];
    return this.commonRegistrationService.getRegistrationByIdShared$(id);
  }

  constructor(
    private registrationService: RegistrationService,
    private commonRegistrationService: CommonRegistrationService,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private summaryItemService: SummaryItemService,
    private userGroupService: UserGroupService
  ) {}

  ngOnInit() {
    this.registrationSubscription = this.regiatration$.subscribe(
      (registration) => {
        this.ngZone.run(() => {
          this.registration = registration;
        });
      }
    );
    this.summarySubscription = combineLatest([
      this.regiatration$,
      this.userGroupService.getUserGroupsAsObservable()
    ])
      .pipe(
        switchMap(([registration, userGroups]) =>
          from(
            this.summaryItemService.getSummaryItems(registration, userGroups)
          )
        )
      )
      .subscribe((summaryItems) => {
        this.ngZone.run(() => {
          this.summaryItems = summaryItems;
        });
      });
    this.userGroupService.updateUserGroups();
  }

  trackByFunction(index: number, item: ISummaryItem) {
    if (!item) {
      return null;
    }
    return item.href;
  }

  ngOnDestroy(): void {
    if (this.summarySubscription) {
      this.summarySubscription.unsubscribe();
    }
    if (this.registrationSubscription) {
      this.registrationSubscription.unsubscribe();
    }
  }
}
