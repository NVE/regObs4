import { Component, OnInit, ChangeDetectorRef, OnDestroy, NgZone } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { Subscription, combineLatest, of, from } from 'rxjs';
import { IRegistration } from '../../models/registration.model';
import { UserGroupService } from '../../../../core/services/user-group/user-group.service';
import { ObserverGroupDto } from '../../../regobs-api/models';
import { RegistrationTid } from '../../models/registrationTid.enum';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { ISummaryItem } from '../../components/summary-item/summary-item.model';
import { ActivatedRoute } from '@angular/router';
import { RegistrationStatus } from '../../models/registrationStatus.enum';
import { SummaryItemService } from '../../services/summary-item.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit, OnDestroy {
  registration: IRegistration;
  RegistationTid = RegistrationTid;
  GeoHazard = GeoHazard;
  RegistrationStatus = RegistrationStatus;
  summaryItems: Array<ISummaryItem> = [];
  private summarySubscription: Subscription;
  private registrationSubscription: Subscription;

  get regiatration$() {
    const id = this.activatedRoute.snapshot.params['id'];
    return this.registrationService.getSavedRegistrationByIdObservable(id);
  }

  constructor(
    private registrationService: RegistrationService,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private summaryItemService: SummaryItemService,
    private userGroupService: UserGroupService) {
  }

  ngOnInit() {
    this.registrationSubscription = this.regiatration$.subscribe((registration) => {
      this.ngZone.run(() => {
        this.registration = registration;
      });
    });
    this.summarySubscription = combineLatest(
      [this.regiatration$,
      this.userGroupService.getUserGroupsAsObservable()]
    ).pipe(switchMap(([registration, userGroups]) =>
      from(this.summaryItemService.getSummaryItems(registration, userGroups))
    )).subscribe((summaryItems) => {
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
