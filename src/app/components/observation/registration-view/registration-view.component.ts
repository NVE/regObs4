import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Viser data for ett skjema i regobs. Med tittel, eventuelle bilder / kart / osv, og selve observasjonsdata.
 */
@Component({
  selector: 'app-registration-view',
  imports: [],
  template: `
    <h3>{{ header() }}</h3>
    <ng-content select="app-attachment-grid"></ng-content>
    <ng-content>Her var det tomt!</ng-content>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
    }

    h3 {
      margin: 0;
      display: inline-block;
      width: 100%;
      background-color: var(--ion-color-light-tint);
      padding: 4px;
      margin-top: 32px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationViewComponent {
  header = input.required<string>();
}
