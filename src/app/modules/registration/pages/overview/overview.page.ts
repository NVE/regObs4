import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { Observable } from 'rxjs';
import { IRegistration } from '../../models/registration.model';
import { tap } from 'rxjs/operators';
import { UserGroupService } from '../../../../core/services/user-group/user-group.service';
import { ObserverGroupDto } from '../../../regobs-api/models';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {
  registration$: Observable<IRegistration>;
  userGroups: ObserverGroupDto[] = [];

  constructor(
    private registrationService: RegistrationService,
    private cdr: ChangeDetectorRef,
    private userGroupService: UserGroupService) {
  }

  async ngOnInit() {
    await this.userGroupService.updateUserGroups();
    this.userGroups = await this.userGroupService.getUserGroups();
    this.registration$ = this.registrationService.registrationForCurrentGeoHazard$.pipe(tap((val) => {
      console.log('Registration changed', val);
      this.cdr.detectChanges();
    }));
  }

  getObservationGroupName(registration: IRegistration) {
    if (registration && registration.ObserverGroupID && this.userGroups) {
      const selectedGroup = this.userGroups.find((x) => x.Id === registration.ObserverGroupID);
      if (selectedGroup) {
        return selectedGroup.Name;
      }
    }
    return '';
  }

  ionViewDidEnter() {
  }

  ionViewWillLeave() {
  }
}
