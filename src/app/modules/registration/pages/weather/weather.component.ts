import { Component, computed, effect, inject, input, linkedSignal, untracked } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import 'nve-designsystem/components/nve-link-card/nve-link-card.component.js';
import { NveLinkCardComponent } from 'src/app/components/designsystem/nve-link-card.component';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { DateHelperService } from 'src/app/modules/shared/services/date-helper/date-helper.service';
import { KdvNveSelectComponent } from 'src/app/components/kdv/kdv-nve-select.component';
import { NveTextareaComponent } from 'src/app/components/designsystem/nve-textarea.component';
import { form, FormField } from '@angular/forms/signals';
import { WeatherEditModel } from 'src/app/modules/common-regobs-api';
import { SendButtonComponent } from '../../components/send-button/send-button.component';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';

interface WeatherForm {
  phenomenon: number | null;
  description: string;
  forecastCorrect: number | null;
  consequence: string;
}

// TODO: Bør skilles tydeligere fra weather.page.ts ? Som er standard vær-skjema for snø?
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  imports: [
    NveLinkCardComponent,
    TranslatePipe,
    KdvNveSelectComponent,
    NveTextareaComponent,
    FormField,
    SendButtonComponent,
  ],
})
export class WeatherComponent {
  private drafts = inject(DraftRepositoryService);
  private dateHelper = inject(DateHelperService);

  readonly draft = input.required<RegistrationDraft>();
  private readonly formModel = linkedSignal(() => {
    const draft = this.draft().registration.WeatherObservation ?? {};
    return {
      phenomenon: draft.WeatherPhenomenonTID ?? null,
      description: draft.Comment ?? '',
      forecastCorrect: draft.ForecastCorrectTID ?? null,
      consequence: draft.Consequence ?? '',
    };
  });

  protected readonly weatherForm = form(this.formModel, (schemaPath) => {
    // Usikker på hvor ofte vi bør lagre.
    // debounce(schemaPath.description, 500);
  });

  readonly obsLocationSubTitle = computed(() => {
    const reg = this.draft()?.registration;
    if (!reg) {
      return undefined;
    }

    const locSummary = reg.ObsLocation?.LocationName || reg.ObsLocation?.LocationDescription || '';
    const timeSummary = reg.DtObsTime ? this.dateHelper.formatDateString(reg.DtObsTime) : '';
    return [locSummary, timeSummary].join(' — ');
  });

  private formModelToApiModel(formModel: WeatherForm): WeatherEditModel {
    return {
      Comment: formModel.description || undefined,
      WeatherPhenomenonTID: formModel.phenomenon ?? undefined,
      Consequence: formModel.consequence || undefined,
      ForecastCorrectTID: formModel.forecastCorrect ?? undefined,
    };
  }

  readonly updatedDraft = computed(() => {
    const draft = this.draft();
    const formModel = this.formModel();
    return {
      ...draft,
      registration: {
        ...draft.registration,
        WeatherObservation: this.formModelToApiModel(formModel),
      },
    };
  });

  constructor() {
    effect(() => {
      const draft = this.updatedDraft();
      untracked(() => {
        this.drafts.save(draft);
      });
    });
  }
}
