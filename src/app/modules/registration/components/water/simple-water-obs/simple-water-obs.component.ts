import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  Signal,
  untracked,
  ValueEqualityFn,
} from '@angular/core';
import { IonIcon, IonItem, IonLabel, IonList, IonText, NavController } from '@ionic/angular/standalone';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { isObservationModelEmptyForRegistrationTid } from 'src/app/modules/common-registration/registration.helpers';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { UrlEditModel } from 'src/app/modules/common-regobs-api';
import { EditImagesBarComponent } from '../../snow/simple-snow-obs/edit-images-bar/edit-images-bar.component';
import { TextCommentComponent } from '../../text-comment/text-comment.component';
import { AddWebUrlItemComponent } from '../../add-web-url-item/add-web-url-item.component';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { checkmarkCircle, chevronForward } from 'ionicons/icons';

/**
 * Simplified water registration schema.'
 * Remember to add schemes in SummaryItemService.getWaterItems to show which schemes were included in the observation when sending fails
 */
@Component({
  selector: 'app-simple-water-obs',
  templateUrl: './simple-water-obs.component.html',
  styleUrls: ['./simple-water-obs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AddWebUrlItemComponent,
    EditImagesBarComponent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonText,
    NgIf,
    TextCommentComponent,
    TranslatePipe,
  ],
})
export class SimpleWaterObsComponent {
  private draftRepository = inject(DraftRepositoryService);
  private navController = inject(NavController);

  readonly draft = input.required<RegistrationDraft>();
  comment = linkedSignal(() => this.draft().registration.GeneralObservation?.ObsComment);
  urls = linkedSignal(() => this.draft().registration.GeneralObservation?.Urls, { equal: urlsEqual });
  waterExtent = computed(() => this.draft().registration.WaterLevel2?.Extent);

  private draftUpdate: Signal<RegistrationDraft> = computed(() => {
    const d = this.draft();
    return {
      ...d,
      registration: {
        ...d.registration,
        GeneralObservation: {
          ...d.registration.GeneralObservation,
          ObsComment: this.comment(),
          Urls: this.urls(),
        },
      },
    };
  });

  constructor() {
    addIcons({ checkmarkCircle, chevronForward });

    // Save draft on updates
    let first = true; // Effect runs at least once, so we track if it is the first run..
    effect(() => {
      const update = this.draftUpdate();
      untracked(() => {
        if (!first) {
          this.save(update);
        }
        first = false;
      });
    }, {});
  }

  async save(draft: RegistrationDraft): Promise<void> {
    const isEmpty = isObservationModelEmptyForRegistrationTid(draft.registration, RegistrationTid.GeneralObservation);
    if (isEmpty) {
      draft.registration.GeneralObservation = undefined;
    }
    await this.draftRepository.save(draft);
  }

  nav() {
    this.navController.navigateForward(`registration/water/set-flood-area/${this.draft().uuid}`);
  }
}

const urlsEqual: ValueEqualityFn<UrlEditModel[] | undefined> = (a, b) => {
  if (!(Array.isArray(a) && Array.isArray(b))) {
    return false;
  }

  if (a.length !== b.length) {
    return false;
  }

  return a.every((v, i) => urlEqual(v, b[i]));
};

const urlEqual: ValueEqualityFn<UrlEditModel> = (a, b) => {
  return a.UrlDescription === b.UrlDescription && a.UrlLine === b.UrlLine;
};
