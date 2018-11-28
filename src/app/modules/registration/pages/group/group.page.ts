import { Component, NgZone } from '@angular/core';
import { UserGroupService } from '../../../../core/services/user-group/user-group.service';
import { ObserverGroupDto } from '../../../regobs-api/models';
import { BasePage } from '../base.page';
import { BasePageService } from '../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { Checkbox } from '@ionic/angular';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage extends BasePage {

  groups: ObserverGroupDto[] = [];

  get firstGroup() {
    return this.groups[0];
  }

  get isSelected() {
    return this.groups.length > 0 && this.groups[0].Id === this.registration.request.ObserverGroupID;
  }

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
    private userGroupService: UserGroupService,
    private ngZone: NgZone,
  ) {
    super(null, basePageService, activatedRoute);
  }

  async onInit() {
    const groups = await this.userGroupService.getUserGroups();
    this.ngZone.run(() => {
      this.groups = groups;
    });
  }

  onReset() {
    this.ngZone.run(() => {
      this.registration.request.ObserverGroupID = undefined;
    });
  }

  checkedChanged(event: CustomEvent) {
    const checkBox = <any>event.target as Checkbox;
    if (checkBox.checked) {
      this.registration.request.ObserverGroupID = this.firstGroup.Id;
    } else {
      this.registration.request.ObserverGroupID = undefined;
    }
  }

  isEmpty() {
    return this.registration &&
      (this.registration.request.ObserverGroupID === undefined || this.registration.request.ObserverGroupID === null);
  }

}
