import { Component, OnInit } from '@angular/core';
import { UserGroupService } from '../../../../core/services/user-group/user-group.service';
import { ObserverGroupDto } from '../../../regobs-api/models';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {

  groups: { group: ObserverGroupDto, selected: boolean }[];

  constructor(
    private userGroupService: UserGroupService,
    private registrationService: RegistrationService
  ) { }

  async ngOnInit() {
    const userGroups = await this.userGroupService.getUserGroups();
    const currentRegistration = await this.registrationService.getCurrentRegistration();
    const existingObserverGroupId = currentRegistration ? currentRegistration.ObserverGroupID : null;
    this.groups = userGroups.map((val) => ({
      group: val,
      selected: val.Id === existingObserverGroupId,
    }));
  }

  async save() {
    const currentRegistration = await this.registrationService.getCurrentRegistration();
    const selectedGroup = this.groups.find((val) => val.selected);
    if (!currentRegistration && !selectedGroup) {
      return; // Nothing to save
    } else {
      const registration = currentRegistration ? currentRegistration : await this.registrationService.createNewRegistration();
      if (selectedGroup) {
        registration.ObserverGroupID = selectedGroup.group.Id;
      } else {
        registration.ObserverGroupID = null;
      }
      return this.registrationService.saveRegistration(registration);
    }
  }

}
