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
      <!--
        Komponenten tillater at man angir "value" / verdien selv uten å bruke value-inputen.
        Feks
        <app-key-value name="Har en verdi med en egen rød stil">
          <p color="red">Verdi</p>
        </app-key-value>
      -->
      <ng-content>
        <span>{{ value() }}</span>
      </ng-content>
    </ion-text>
  `,
  styleUrl: './key-value.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyValueComponent {
  key = input<string>();
  value = input<string | number | null>();
}
