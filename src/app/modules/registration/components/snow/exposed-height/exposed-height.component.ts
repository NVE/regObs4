import { Component, computed, model, signal, ChangeDetectionStrategy } from '@angular/core';
import { IonCol, IonGrid, IonItem, IonLabel, IonRow, IonText } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { SelectOption } from '../../../../shared/components/input/select/select-option.model';
import { SelectComponent } from '../../../../shared/components/input/select/select.component';

interface HeightSelectOption extends SelectOption {
  id: number;
}

enum ExposedHeightCombo {
  NotGiven = 0,
  BottomWhite = 1,
  BottomBlack = 2,
  MiddleWhite = 3,
  MiddleBlack = 4,
}

/** Fjell høyde områder */
type ExposedHeightPosition = 'top' | 'middle' | 'bottom';

/** Nøkkel er fjell utsatt høyde, verdi er om den er valgt.  */
type HeightsState = Record<ExposedHeightPosition, boolean>;

@Component({
  selector: 'app-exposed-height',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './exposed-height.component.html',
  styleUrls: ['./exposed-height.component.scss'],
  imports: [IonCol, IonGrid, IonItem, IonLabel, IonRow, IonText, SelectComponent, TranslatePipe],
})
export class ExposedHeightComponent {
  readonly exposedHeightComboTID = model<number>();
  readonly exposedHeight1 = model<number>();
  readonly exposedHeight2 = model<number>();

  // Valgte høyder
  heights = signal<HeightsState>({
    top: false,
    middle: false,
    bottom: false,
  });

  // Høyder gjort om til et array for enklere iterasjon i html malen
  heightEntries = computed(() =>
    Object.entries(this.heights()).map(([key, value]) => ({ key: key as ExposedHeightPosition, value }))
  );

  heightArray = createHeightArray();

  lowerHeightArray = computed(() => {
    const height1 = this.exposedHeight1();
    return this.heightArray.filter((h) => height1 == null || h.id < height1);
  });

  ngOnInit() {
    if (this.exposedHeightComboTID() === 0) {
      this.heights.update(() => ({ top: true, middle: true, bottom: true }));
    } else if (this.exposedHeightComboTID() === 1) {
      // Svart øverst
      this.heights.update((heights) => ({ ...heights, top: true, bottom: false }));
    } else if (this.exposedHeightComboTID() === 2) {
      // Svart nederst
      this.heights.update((heights) => ({ ...heights, bottom: true }));
    } else if (this.exposedHeightComboTID() === 3) {
      // Svart øverst og nederst
      this.heights.update((heights) => ({ ...heights, top: true, bottom: true }));
    } else if (this.exposedHeightComboTID() === 4) {
      // Svart i midten
      this.heights.update((heights) => ({ ...heights, middle: true }));
    }
  }

  toggleExsposedHeightCombo(position: 'top' | 'middle' | 'bottom') {
    this.heights.update((heights) => ({ ...heights, [position]: !heights[position] }));
    this.applyChanges();
  }

  sholdUseExposedHight2 = computed(
    () =>
      (this.heights().top && this.heights().bottom && !this.heights().middle) ||
      (!this.heights().top && !this.heights().bottom && this.heights().middle)
  );

  applyChanges() {
    if (!this.sholdUseExposedHight2()) {
      this.exposedHeight2.set(undefined);
    }
    const currentExposedHeightComboTID = this.currentExposedHeightComboTID();
    this.exposedHeightComboTID.set(currentExposedHeightComboTID);
  }

  private currentExposedHeightComboTID(): number | undefined {
    if (this.heights().top && this.heights().middle && this.heights().bottom) {
      return ExposedHeightCombo.NotGiven;
    }
    if (!this.heights().top && this.heights().middle && !this.heights().bottom) {
      return ExposedHeightCombo.MiddleBlack;
    }
    if (this.heights().top && !this.heights().middle && this.heights().bottom) {
      return ExposedHeightCombo.MiddleWhite;
    }
    if (this.heights().bottom) {
      return ExposedHeightCombo.BottomBlack;
    }
    if (this.heights().top) {
      return ExposedHeightCombo.BottomWhite;
    }
    return undefined;
  }
}

function createHeightArray() {
  const options: HeightSelectOption[] = [];
  for (let id = 0; id <= 8000; id += 100) {
    options.push({ id, text: `${id} m` });
  }
  return options;
}
