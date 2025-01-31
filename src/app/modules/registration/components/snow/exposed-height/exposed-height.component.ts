import { IonGrid, IonItem, IonRow, IonCol, IonText, IonLabel } from '@ionic/angular/standalone';
import { Component, model, computed } from '@angular/core';
import { SelectOption } from '../../../../shared/components/input/select/select-option.model';
import { NgClass, NgIf } from '@angular/common';
import { SelectComponent } from '../../../../shared/components/input/select/select.component';
import { TranslatePipe } from '@ngx-translate/core';

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

@Component({
  selector: 'app-exposed-height',
  templateUrl: './exposed-height.component.html',
  styleUrls: ['./exposed-height.component.scss'],
  imports: [IonCol, IonGrid, IonItem, IonLabel, IonRow, IonText, NgClass, NgIf, SelectComponent, TranslatePipe],
})
export class ExposedHeightComponent {
  readonly exposedHeightComboTID = model<number>();
  readonly exposedHeight1 = model<number>();
  readonly exposedHeight2 = model<number>();

  exposedHeightTop = false;
  exposedHeightMiddle = false;
  exposedHeightBottom = false;

  heightArray = createHeightArray();

  lowerHeightArray = computed(() => {
    const height1 = this.exposedHeight1();
    return this.heightArray.filter((h) => height1 == null || h.id < height1);
  });

  ngOnInit() {
    this.setExposedHeights(this.exposedHeightComboTID());
  }

  setExposedHeights(exposedHeightComboTID: number | undefined) {
    if (exposedHeightComboTID === 0) {
      this.exposedHeightTop = true;
      this.exposedHeightMiddle = true;
      this.exposedHeightBottom = true;
    } else if (exposedHeightComboTID === 1) {
      // Hvit nederst
      this.exposedHeightTop = true;
      this.exposedHeightMiddle = true;
      this.exposedHeightBottom = false;
    } else if (exposedHeightComboTID === 2) {
      // Svart nederst
      this.exposedHeightTop = false;
      this.exposedHeightMiddle = false;
      this.exposedHeightBottom = true;
    } else if (exposedHeightComboTID === 3) {
      // Hvit i midten
      this.exposedHeightTop = true;
      this.exposedHeightMiddle = false;
      this.exposedHeightBottom = true;
    } else if (exposedHeightComboTID === 4) {
      // Svart i midten
      this.exposedHeightTop = false;
      this.exposedHeightMiddle = true;
      this.exposedHeightBottom = false;
    } else {
      this.exposedHeightTop = false;
      this.exposedHeightMiddle = false;
      this.exposedHeightBottom = false;
    }
  }

  toggleExsposedHeightCombo(position: 'top' | 'middle' | 'bottom') {
    if (position === 'top') {
      this.exposedHeightTop = !this.exposedHeightTop;
    } else if (position === 'middle') {
      this.exposedHeightMiddle = !this.exposedHeightMiddle;
    } else {
      this.exposedHeightBottom = !this.exposedHeightBottom;
    }
    this.applyChanges();
  }

  sholdUseExposedHight2() {
    return (
      (this.exposedHeightTop && this.exposedHeightBottom && !this.exposedHeightMiddle) ||
      (!this.exposedHeightTop && !this.exposedHeightBottom && this.exposedHeightMiddle)
    );
  }

  private updateExposedHeightComboTID(top: boolean, middle: boolean, bottom: boolean) {
    if (top && middle && bottom) {
      this.exposedHeightComboTID.set(ExposedHeightCombo.NotGiven);
    } else if (!top && middle && !bottom) {
      this.exposedHeightComboTID.set(ExposedHeightCombo.MiddleBlack);
    } else if (top && !middle && bottom) {
      this.exposedHeightComboTID.set(ExposedHeightCombo.MiddleWhite);
    } else if (bottom) {
      this.exposedHeightComboTID.set(ExposedHeightCombo.BottomBlack);
    } else if (top) {
      this.exposedHeightComboTID.set(ExposedHeightCombo.BottomWhite);
    } else {
      this.exposedHeightComboTID.set(undefined);
    }
  }

  applyChanges() {
    this.updateExposedHeightComboTID(this.exposedHeightTop, this.exposedHeightMiddle, this.exposedHeightBottom);
    if (!this.sholdUseExposedHight2()) {
      this.exposedHeight2.set(undefined);
    }
  }
}

function createHeightArray() {
  const options: HeightSelectOption[] = [];
  for (let id = 0; id <= 8000; id += 100) {
    options.push({ id, text: `${id} m` });
  }
  return options;
}
