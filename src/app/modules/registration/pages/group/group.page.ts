import { Component, inject , ChangeDetectionStrategy } from '@angular/core';
import { UserGroupService } from '../../../../core/services/user-group/user-group.service';
import { ObserverGroupDto, RegistrationEditModel } from 'src/app/modules/common-regobs-api/models';
import { BasePage } from '../base.page';
import {
  IonBackButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { HeaderColorDirective } from '../../../shared/directives/header-color/header-color.directive';

import { RegistrationContentWrapperComponent } from '../../components/registration-content-wrapper/registration-content-wrapper.component';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
  imports: [
    FormsModule,
    HeaderColorDirective,
    IonBackButton,
    IonButtons,
    IonCheckbox,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonRadio,
    IonRadioGroup,
    IonTitle,
    IonToolbar,
    RegistrationContentWrapperComponent,
    TranslatePipe,
  ],
})
export class GroupPage extends BasePage {
  private userGroupService = inject(UserGroupService);

  registrationTid = undefined;

  groups: ObserverGroupDto[] = [];

  get firstGroup(): ObserverGroupDto {
    return this.groups[0];
  }

  get isSelected(): boolean {
    return this.groups.length > 0 && this.groups[0].Id === this.draft.registration.ObserverGroupID;
  }

  constructor() {
    super();
  }

  override async onInit(): Promise<void> {
    const groups = await this.userGroupService.getUserGroups();
    this.groups = groups;
    this.cdr.markForCheck();
  }

  override async reset() {
    const pleaseReset = await super.reset();

    if (pleaseReset) {
      this.groupChanged(undefined);
    }

    return pleaseReset;
  }

  groupChanged(ObserverGroupID: RegistrationEditModel['ObserverGroupID']) {
    this.draft = {
      ...this.draft,
      registration: {
        ...this.draft.registration,
        ObserverGroupID,
      },
    };
  }

  checkedChanged(event: CustomEvent): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checkBox = (<any>event.target) as IonCheckbox;
    let ObserverGroupID: RegistrationEditModel['ObserverGroupID'] = undefined;
    if (checkBox.checked) {
      ObserverGroupID = this.firstGroup.Id;
    }
    this.groupChanged(ObserverGroupID);
  }

  override isEmpty(): Promise<boolean> {
    return Promise.resolve(
      this.draft &&
        (this.draft.registration.ObserverGroupID === undefined || this.draft.registration.ObserverGroupID === null)
    );
  }
}
