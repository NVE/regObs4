import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IonText } from '@ionic/angular/standalone';

/**
 * Brukes i observasjonskort for å vise registreringsverdier som "tittel / nøkkel": "verdi"
 */
@Component({
  selector: 'app-key-value',
  imports: [IonText],
  template: `
    <ion-text color="dark">
      @if (key()) {
        <span class="key">{{ key() }}:</span>&nbsp;
      }
      <span class="value">{{ value() }}</span>
    </ion-text>
  `,
  styleUrl: './key-value.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyValueComponent {
  key = input<string>();
  value = input<string>();
}
