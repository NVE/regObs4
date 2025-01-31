import { IonGrid, IonItem, IonRow, IonCol, IonText, IonLabel } from '@ionic/angular/standalone';
import { Component, model, computed } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

const EMPTY_EXPOSITION = '00000000';
const ALL_EXPOSITION = '11111111';

@Component({
  selector: 'app-valid-exposition',
  templateUrl: './valid-exposition.component.html',
  styleUrls: ['./valid-exposition.component.scss'],
  imports: [IonCol, IonGrid, IonItem, IonLabel, IonRow, IonText, NgClass, NgIf, TranslatePipe],
})
export class ValidExpositionComponent {
  readonly validExposition = model<string>();

  n = computed(() => isSelected(0, this.validExposition()));
  ne = computed(() => isSelected(1, this.validExposition()));
  e = computed(() => isSelected(2, this.validExposition()));
  se = computed(() => isSelected(3, this.validExposition()));
  s = computed(() => isSelected(4, this.validExposition()));
  sw = computed(() => isSelected(5, this.validExposition()));
  w = computed(() => isSelected(6, this.validExposition()));
  nw = computed(() => isSelected(7, this.validExposition()));
  all = computed(() => this.validExposition() === ALL_EXPOSITION);

  setExposition(index: number) {
    this.validExposition.update((value) => {
      const newValue = [...(value ?? EMPTY_EXPOSITION)]
        .map((v, i) => {
          if (i !== index) {
            return v;
          }
          return v === '1' ? '0' : '1';
        })
        .join('');
      return newValue === EMPTY_EXPOSITION ? undefined : newValue;
    });
  }

  toggleAllExpositions() {
    this.validExposition.update((value) => (value === ALL_EXPOSITION ? undefined : ALL_EXPOSITION));
  }
}

function isSelected(index: number, exposition?: string) {
  if (exposition == null) {
    return false;
  }

  return exposition[index] === '1';
}
