import { Component } from '@angular/core';
import { BasePageService } from '../../base-page-service';
import { BasePage } from '../../base.page';
import { ActivatedRoute } from '@angular/router';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { SelectOption } from '../../../../shared/components/input/select/select-option.model';
import { IonicModule } from '@ionic/angular';
import { HeaderColorDirective } from '../../../../shared/directives/header-color/header-color.directive';
import { NgIf } from '@angular/common';
import { RegistrationContentWrapperComponent } from '../../../components/registration-content-wrapper/registration-content-wrapper.component';
import { KdvSelectComponent } from '../../../../../components/kdv-select/kdv-select.component';
import { NumericInputComponent } from '../../../components/numeric-input/numeric-input.component';
import { SelectComponent } from '../../../../shared/components/input/select/select.component';
import { TextCommentComponent } from '../../../components/text-comment/text-comment.component';
import { EditImagesComponent } from '../../../components/edit-images/edit-images.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  imports: [
    IonicModule,
    HeaderColorDirective,
    NgIf,
    RegistrationContentWrapperComponent,
    KdvSelectComponent,
    NumericInputComponent,
    SelectComponent,
    TextCommentComponent,
    EditImagesComponent,
    TranslateModule,
  ],
})
export class WeatherPage extends BasePage {
  windDirectionOptions: SelectOption[] = [
    { id: 0, text: 'REGISTRATION.SNOW.WEATHER.FROM_NORTH' },
    { id: 45, text: 'REGISTRATION.SNOW.WEATHER.FROM_NORTH_EAST' },
    { id: 90, text: 'REGISTRATION.SNOW.WEATHER.FROM_EAST' },
    { id: 135, text: 'REGISTRATION.SNOW.WEATHER.FROM_SOUTH_EAST' },
    { id: 180, text: 'REGISTRATION.SNOW.WEATHER.FROM_SOUTH' },
    { id: 225, text: 'REGISTRATION.SNOW.WEATHER.FROM_SOUTH_WEST' },
    { id: 270, text: 'REGISTRATION.SNOW.WEATHER.FROM_WEST' },
    { id: 315, text: 'REGISTRATION.SNOW.WEATHER.FROM_NORTH_WEST' },
  ];

  constructor(basePageService: BasePageService, activatedRoute: ActivatedRoute) {
    super(RegistrationTid.WeatherObservation, basePageService, activatedRoute);
  }
}
