import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Viser data for ett skjema i regobs. Med tittel, eventuelle bilder / kart / osv, og selve observasjonsdata.
 * Kan lukkes for å vise kun tittel.
 */
@Component({
  selector: 'app-registration-view',
  imports: [],
  template: `
    <details open>
      <summary>
        <h3>{{ header() }}</h3>
      </summary>
      <ng-content select="app-attachment-grid"></ng-content>
      <ng-content>Her var det tomt!</ng-content>
    </details>
  `,
  styles: `
    :host {
      display: block;
    }

    h3 {
      margin: 0;
      display: inline-block;
    }

    summary {
      background-color: var(--ion-color-light-tint);
      padding: 4px;
      margin-top: 32px;
      cursor: pointer;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationViewComponent {
  header = input.required<string>();
}
