import { Component, NgZone } from '@angular/core';
import { UserGroupService } from '../../../../core/services/user-group/user-group.service';
import { ObserverGroupDto } from '../../../regobs-api/models';
import { BasePage } from '../base.page';
import { BasePageService } from '../base-page-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage extends BasePage {

  groups: ObserverGroupDto[];

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
    private userGroupService: UserGroupService,
    private ngZone: NgZone,
  ) {
    super(null, basePageService, activatedRoute);
  }

  async onInit() {
    this.groups = await this.userGroupService.getUserGroups();
  }

  onReset() {
    this.ngZone.run(() => {
      this.registration.request.ObserverGroupID = undefined;
    });
  }

  isEmpty() {
    return this.registration &&
      (this.registration.request.ObserverGroupID === undefined || this.registration.request.ObserverGroupID === null);
  }

}
