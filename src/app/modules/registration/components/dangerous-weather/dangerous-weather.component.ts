import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input } from '@angular/core';
import { IonList, IonListHeader, IonLabel, IonItemDivider } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { TextCommentComponent } from '../../components/text-comment/text-comment.component';
import { EditImagesComponent } from '../../components/edit-images/edit-images.component';
import { RegistrationTid, SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { WeatherEditModel } from 'src/app/modules/common-regobs-api';
import { KdvSelectComponent } from 'src/app/components/kdv-select/kdv-select.component';
import { ISummaryItem } from '../../components/summary-item/summary-item.model';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { HelpTextComponent } from '../../components/help-text/help-text.component';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';

@Component({
  selector: 'app-weather-page',
  imports: [
    TranslatePipe,
    IonList,
    IonListHeader,
    TextCommentComponent,
    IonLabel,
    EditImagesComponent,
    IonItemDivider,
    KdvSelectComponent,
    HelpTextComponent,
  ],
  templateUrl: './weather.page.html',
  styleUrl: './weather.page.css',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class WeatherPage {
  private cdr = inject(ChangeDetectorRef);
  private draftService = inject(DraftRepositoryService);

  draft = input.required<RegistrationDraft>();

  registrationTid = RegistrationTid.WeatherObservation;
  locationAndTimeSummary!: ISummaryItem;

  onEditOpened() {
    this.cdr.detectChanges();
  }

  get weather(): WeatherEditModel {
    if (this.draft().registration.WeatherObservation == null) {
      this.draft().registration.WeatherObservation = {};
    }
    return this.draft().registration.WeatherObservation as WeatherEditModel;
  }

  hasError(draft: RegistrationDraft): boolean {
    if (draft.error == null) {
      return false;
    }
    return draft?.syncStatus === SyncStatus.Sync || draft?.syncStatus === SyncStatus.SyncAndIgnoreVersionCheck;
  }

  save() {
    this.draftService.save({
      ...this.draft(),
      registration: {
        ...this.draft().registration,
        WeatherObservation: this.weather,
      },
    });
  }

  updatePhenomenon(tid: number | undefined) {
    this.weather.WeatherPhenomenonTID = tid;
    this.save();
  }

  updateComment(value: string | undefined) {
    this.weather.Comment = value;
    this.save();
  }

  updateConsequence(value: string | undefined) {
    this.weather.Consequence = value;
    this.save();
  }

  updateForecastCorrect(tid: number | undefined) {
    this.weather.ForecastCorrectTID = tid;
    this.save();
  }
}
