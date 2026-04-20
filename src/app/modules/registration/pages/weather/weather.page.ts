import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonList,
  IonListHeader,
  IonLabel,
  IonItemDivider,
  IonFooter,
} from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { TextCommentComponent } from '../../components/text-comment/text-comment.component';
import { EditImagesComponent } from '../../components/edit-images/edit-images.component';
import { BasePage } from '../base.page';
import { RegistrationTid, SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { WeatherEditModel } from 'src/app/modules/common-regobs-api';
import { HeaderColorDirective } from 'src/app/modules/shared/directives/header-color/header-color.directive';
import { KdvSelectComponent } from 'src/app/components/kdv-select/kdv-select.component';
import { SendButtonComponent } from '../../components/send-button/send-button.component';
import { SummaryItemComponent } from '../../components/summary-item/summary-item.component';
import { SummaryItemService } from '../../services/summary-item.service';
import { ISummaryItem } from '../../components/summary-item/summary-item.model';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { FailedRegistrationComponent } from '../../components/failed-registration/failed-registration.component';

@Component({
  selector: 'app-weather-page',
  imports: [
    HeaderColorDirective,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    TranslatePipe,
    IonContent,
    IonList,
    IonListHeader,
    TextCommentComponent,
    IonLabel,
    EditImagesComponent,
    IonItemDivider,
    KdvSelectComponent,
    IonFooter,
    SendButtonComponent,
    SummaryItemComponent,
    FailedRegistrationComponent,
  ],
  templateUrl: './weather.page.html',
  styleUrl: './weather.page.css',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class WeatherPage extends BasePage {
  private summaryService = inject(SummaryItemService);

  override registrationTid = RegistrationTid.WeatherObservation;
  locationAndTimeSummary!: ISummaryItem;
  sendButton = viewChild(SendButtonComponent);

  onEditOpened() {
    this.cdr.detectChanges();
    this.sendButton()?.hasChanges.next();
  }

  override ionViewWillLeave(): Promise<void> {
    return Promise.resolve();
  }

  get weather(): WeatherEditModel {
    if (this.draft.registration.WeatherObservation == null) {
      this.draft.registration.WeatherObservation = {};
    }
    return this.draft.registration.WeatherObservation;
  }

  override onInit(): void | Promise<unknown> {
    this.locationAndTimeSummary = this.summaryService.getLocationAndTimeSummaryItem(this.draft);
  }

  hasError(draft: RegistrationDraft): boolean {
    if (draft.error == null) {
      return false;
    }
    return draft?.syncStatus === SyncStatus.Sync || draft?.syncStatus === SyncStatus.SyncAndIgnoreVersionCheck;
  }

  updatePhenomenon(tid: number | undefined) {
    this.weather.WeatherPhenomenonTID = tid;
    this.save();
    this.sendButton()?.hasChanges.next();
  }

  updateComment(value: string | undefined) {
    this.weather.Comment = value;
    this.save();
    this.sendButton()?.hasChanges.next();
  }

  updateConsequence(value: string | undefined) {
    this.weather.Consequence = value;
    this.save();
    this.sendButton()?.hasChanges.next();
  }

  updateForecastCorrect(tid: number | undefined) {
    this.weather.ForecastCorrectTID = tid;
    this.save();
    this.sendButton()?.hasChanges.next();
  }
}
