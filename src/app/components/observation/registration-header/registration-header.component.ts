import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Tittel for observasjon.
 * Brukes både på detaljside og på observasjonskort.
 */
@Component({
  selector: 'app-registration-header',
  imports: [],
  template: `<h2><ng-content /></h2>`,
  styles: `
    :host {
      display: block;
    }
    h2 {
      font-size: 1.5rem;
      color: var(--ion-text-color-heading);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationHeaderComponent {}
