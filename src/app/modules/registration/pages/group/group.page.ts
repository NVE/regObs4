import { Component, NgZone } from '@angular/core';
import { UserGroupService } from '../../../../core/services/user-group/user-group.service';
import { ObserverGroupDto } from 'src/app/modules/common-regobs-api/models';
import { BasePage } from '../base.page';
import { BasePageService } from '../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { IonCheckbox } from '@ionic/angular';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss']
})
export class GroupPage extends BasePage {
  groups: ObserverGroupDto[] = [];

  get firstGroup(): ObserverGroupDto {
    return this.groups[0];
  }

  get isSelected(): boolean {
    return (
      this.groups.length > 0 &&
      this.groups[0].Id === this.draft.registration.ObserverGroupID
    );
  }

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
    private userGroupService: UserGroupService,
    private ngZone: NgZone
  ) {
    super(null, basePageService, activatedRoute);
  }

  async onInit(): Promise<void> {
    const groups = await this.userGroupService.getUserGroups();
    this.ngZone.run(() => {
      this.groups = groups;
    });
  }

  onReset(): void {
    this.ngZone.run(() => {
      this.draft.registration.ObserverGroupID = undefined;
    });
  }

  checkedChanged(event: CustomEvent): void {
    const checkBox = (<any>event.target) as IonCheckbox;
    if (checkBox.checked) {
      this.draft.registration.ObserverGroupID = this.firstGroup.Id;
    } else {
      this.draft.registration.ObserverGroupID = undefined;
    }
  }

  isEmpty(): Promise<boolean> {
    return Promise.resolve(
      this.draft &&
      (this.draft.registration.ObserverGroupID === undefined ||
        this.draft.registration.ObserverGroupID === null)
    );
  }
}
