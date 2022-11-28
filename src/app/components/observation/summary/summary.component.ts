import { Component, Input } from '@angular/core';
import { Summary } from 'src/app/modules/common-regobs-api/models';
import { SummaryType } from '../../../core/models/summmary-type.enum';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  @Input() summaries: Summary[];
  @Input() showHeaders = true;

  SummaryType = SummaryType;

  isNameSameAsPreviousName(i: number): boolean {
    if (i < 1 || this.summaries?.length < 2) {
      return false;
    }
    return this.summaries[i].RegistrationName === this.summaries[i-1].RegistrationName;
  }

  startOnNewLineIfContainLineBreaks(text: string): string {
    if (text && typeof text === 'string' && text.indexOf('\n') >= 0) {
      return `\n${text}\n`;
    }
    return text;
  }
}
