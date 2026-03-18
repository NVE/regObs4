import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { BasePage } from '../../base.page';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonTitle,
  IonToolbar,
  IonModal,
  IonButton,
} from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { SelectOption } from 'src/app/modules/shared/components/input/select/select-option.model';
import { HeaderColorDirective } from '../../../../shared/directives/header-color/header-color.directive';
import { RegistrationContentWrapperComponent } from '../../../components/registration-content-wrapper/registration-content-wrapper.component';
import { YesNoSelectComponent } from '../../../components/yes-no-select/yes-no-select.component';
import { SelectComponent } from '../../../../shared/components/input/select/select.component';
import { NumericInputComponent } from '../../../components/numeric-input/numeric-input.component';
import { TextCommentComponent } from '../../../components/text-comment/text-comment.component';
import { StratProfileComponent } from '../../../components/snow/snow-profile/strat-profile/strat-profile.component';
import { SnowTempComponent } from '../../../components/snow/snow-profile/snow-temp/snow-temp.component';
import { SnowDensityComponent } from '../../../components/snow/snow-profile/snow-density/snow-density.component';
import { CompressionTestComponent } from '../../../components/snow/snow-profile/compression-test/compression-test.component';
import { EditImagesComponent } from '../../../components/edit-images/edit-images.component';
import { addIcons } from 'ionicons';
import { eye } from 'ionicons/icons';
import { SnowProfileEditModel } from 'src/app/modules/common-regobs-api';
import { isEmpty } from 'src/app/modules/common-core/helpers';
import { SnowProfileComponent } from 'src/app/components/snow-profile/snow-profile.component';

/**
 * Main snow profile page.
 *
 * Contains sub forms:
 *   - Snow profile
 *   - Temp profile
 *   - Density
 *   - Tests
 */
@Component({
  selector: 'app-snow-profile-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './snow-profile.page.html',
  styleUrls: ['./snow-profile.page.scss'],
  imports: [
    IonButton,
    IonModal,
    CompressionTestComponent,
    EditImagesComponent,
    HeaderColorDirective,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonTitle,
    IonToolbar,
    NumericInputComponent,
    RegistrationContentWrapperComponent,
    SelectComponent,
    SnowDensityComponent,
    SnowTempComponent,
    StratProfileComponent,
    TextCommentComponent,
    TranslatePipe,
    YesNoSelectComponent,
    SnowProfileComponent,
  ],
})
export class SnowProfilePage extends BasePage {
  override registrationTid = RegistrationTid.SnowProfile2;

  expositionOptions: SelectOption[] = [
    { id: 0, text: 'REGISTRATION.SNOW.SNOW_PROFILE.NORTH' },
    { id: 1, text: 'REGISTRATION.SNOW.SNOW_PROFILE.NORTH_EAST' },
    { id: 2, text: 'REGISTRATION.SNOW.SNOW_PROFILE.EAST' },
    { id: 3, text: 'REGISTRATION.SNOW.SNOW_PROFILE.SOUTH_EAST' },
    { id: 4, text: 'REGISTRATION.SNOW.SNOW_PROFILE.SOUTH' },
    { id: 5, text: 'REGISTRATION.SNOW.SNOW_PROFILE.SOUTH_WEST' },
    { id: 6, text: 'REGISTRATION.SNOW.SNOW_PROFILE.WEST' },
    { id: 7, text: 'REGISTRATION.SNOW.SNOW_PROFILE.NORTH_WEST' },
  ];

  showPreview = signal<boolean>(false);

  constructor() {
    super();
    addIcons({ eye });
  }

  get snowProfile(): SnowProfileEditModel {
    if (this.draft.registration.SnowProfile2 == null) {
      this.draft.registration.SnowProfile2 = {};
    }
    return this.draft.registration.SnowProfile2;
  }

  noLayersInSnowProfile(): boolean {
    return isEmpty(this.snowProfile.StratProfile?.Layers);
  }

  private noTestsIncludedInSnowProfile(): boolean {
    return !(this.draft.registration.CompressionTest || []).some((ct) => ct.IncludeInSnowProfile === true);
  }

  override isEmpty() {
    const isEmptyResult = this.noLayersInSnowProfile() && this.noTestsIncludedInSnowProfile() && super.isEmpty();
    return Promise.resolve(isEmptyResult);
  }
}
