import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Komponent for å gruppere key-value-komponenter.
 * Viser ofte data knytta til en observasjon, metadata eller konkrete observasjonsdata.
 *
 * TODO: Det som er lagt inn som gap her er bare et forslag. Det er ikke noe entydig padding/margin
 * i skissene.
 */
@Component({
  selector: 'app-key-value-group',
  imports: [],
  template: `<ng-content select="app-key-value"></ng-content>`,
  styles: `
    :host {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      gap: 10px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyValueGroupComponent {}
