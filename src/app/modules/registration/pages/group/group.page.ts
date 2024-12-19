import { Component, NgZone, inject } from '@angular/core';
import { UserGroupService } from '../../../../core/services/user-group/user-group.service';
import { ObserverGroupDto, RegistrationEditModel } from 'src/app/modules/common-regobs-api/models';
import { BasePage } from '../base.page';
import { BasePageService } from '../base-page-service';
import { ActivatedRoute } from '@angular/router';
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
import { NgIf, NgFor } from '@angular/common';
import { RegistrationContentWrapperComponent } from '../../components/registration-content-wrapper/registration-content-wrapper.component';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-group',
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
    NgFor,
    NgIf,
    RegistrationContentWrapperComponent,
    TranslatePipe,
  ],
})
export class GroupPage extends BasePage {
  private userGroupService = inject(UserGroupService);
  private ngZone = inject(NgZone);

  groups: ObserverGroupDto[] = [];

  get firstGroup(): ObserverGroupDto {
    return this.groups[0];
  }

  get isSelected(): boolean {
    return this.groups.length > 0 && this.groups[0].Id === this.draft.registration.ObserverGroupID;
  }

  constructor() {
    const basePageService = inject(BasePageService);
    const activatedRoute = inject(ActivatedRoute);

    super(null, basePageService, activatedRoute);
  }

  async onInit(): Promise<void> {
    const groups = await this.userGroupService.getUserGroups();
    this.ngZone.run(() => {
      this.groups = groups;
    });
  }

  async reset() {
    const pleaseReset = await super.reset();

    if (pleaseReset) {
      this.groupChanged(null);
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
    const checkBox = (<any>event.target) as IonCheckbox;
    let ObserverGroupID: RegistrationEditModel['ObserverGroupID'] = null;
    if (checkBox.checked) {
      ObserverGroupID = this.firstGroup.Id;
    }
    this.groupChanged(ObserverGroupID);
  }

  isEmpty(): Promise<boolean> {
    return Promise.resolve(
      this.draft &&
        (this.draft.registration.ObserverGroupID === undefined || this.draft.registration.ObserverGroupID === null)
    );
  }
}
