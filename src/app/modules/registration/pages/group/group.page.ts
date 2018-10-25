import { Component, OnInit } from '@angular/core';
import { UserGroupService } from '../../../../core/services/user-group/user-group.service';
import { ObserverGroupDto } from '../../../regobs-api/models';
import { RegistrationService } from '../../services/registration.service';
import { BasePage } from '../base.page';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage extends BasePage {

  groups: { group: ObserverGroupDto, selected: boolean }[];

  constructor(
    registrationService: RegistrationService,
    private userGroupService: UserGroupService,
  ) {
    super(null, registrationService);
  }

  async onInit() {
    const userGroups = await this.userGroupService.getUserGroups();
    const existingObserverGroupId = this.registration ? this.registration.ObserverGroupID : null;
    this.groups = userGroups.map((val) => ({
      group: val,
      selected: val.Id === existingObserverGroupId,
    }));
  }

  onBeforeLeave() {
    const selectedGroup = this.groups.find((val) => val.selected);
    if (selectedGroup) {
      this.registration.ObserverGroupID = selectedGroup.group.Id;
    } else {
      this.registration.ObserverGroupID = null;
    }
  }

  onReset() {
    this.registration.ObserverGroupID = null;
    for (const g of this.groups) {
      g.selected = false;
    }
  }

  isEmpty() {
    return !this.groups || !this.groups.some((x) => x.selected);
  }

}
