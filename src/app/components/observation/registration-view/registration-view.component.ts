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
    <ng-content></ng-content>
  `,
  styles: `
    :host {
      border: 2px solid var(--ion-color-light-tint);
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-top: 24px;
      padding-bottom: 32px;
      padding-left: 32px;
      padding-right: 32px;
    }

    h3 {
      margin: 0;
      display: inline-block;
      width: 100%;
      background-color: var(--ion-color-light-tint);
      font-size: 20px;
      font-weight: 600;
      padding: 8px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationViewComponent {
  header = input.required<string>();
}
