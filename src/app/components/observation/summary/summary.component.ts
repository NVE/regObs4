import { Component, input } from '@angular/core';
import { Summary } from 'src/app/modules/common-regobs-api/models';
import { SummaryType } from '../../../core/models/summmary-type.enum';
import { NgFor, NgIf, NgTemplateOutlet, NgSwitch, NgSwitchCase } from '@angular/common';
import { ExternalLinkComponent } from '../../../modules/shared/components/external-link/external-link.component';
import { RegistrationHeaderComponent } from '../registration-header/registration-header.component';
import { KeyValueComponent } from '../key-value/key-value.component';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  imports: [
    NgFor,
    NgIf,
    NgTemplateOutlet,
    NgSwitch,
    NgSwitchCase,
    ExternalLinkComponent,
    RegistrationHeaderComponent,
    KeyValueComponent,
  ],
})
export class SummaryComponent {
  readonly summaries = input.required<Summary[]>();
  readonly showHeaders = input(true);

  SummaryType = SummaryType;

  isNameSameAsPreviousName(i: number): boolean {
    if (i < 1 || this.summaries()?.length < 2) {
      return false;
    }
    return this.summaries()[i].RegistrationName === this.summaries()[i - 1].RegistrationName;
  }

  startOnNewLineIfContainLineBreaks(text: string): string {
    if (text && typeof text === 'string' && text.indexOf('\n') >= 0) {
      return `\n${text}\n`;
    }
    return text;
  }
}
