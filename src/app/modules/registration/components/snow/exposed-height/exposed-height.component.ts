import { IonGrid, IonItem, IonRow, IonCol, IonText, IonLabel } from '@ionic/angular/standalone';
import { Component, OnInit, Input, Output, NgZone, EventEmitter, inject } from '@angular/core';
import { SelectOption } from '../../../../shared/components/input/select/select-option.model';
import { NgClass, NgIf } from '@angular/common';
import { SelectComponent } from '../../../../shared/components/input/select/select.component';
import { TranslatePipe } from '@ngx-translate/core';

interface HeightSelectOption extends SelectOption {
  id: number;
}

@Component({
  selector: 'app-exposed-height',
  templateUrl: './exposed-height.component.html',
  styleUrls: ['./exposed-height.component.scss'],
  imports: [IonCol, IonGrid, IonItem, IonLabel, IonRow, IonText, NgClass, NgIf, SelectComponent, TranslatePipe],
})
export class ExposedHeightComponent implements OnInit {
  private ngZone = inject(NgZone);

  @Input() exposedHeightComboTID?: number;
  @Output() exposedHeightComboTIDChange = new EventEmitter();
  @Input() exposedHeight1?: number;
  @Output() exposedHeight1Change = new EventEmitter();
  @Input() exposedHeight2?: number;
  @Output() exposedHeight2Change = new EventEmitter();

  exposedHeightTop = false;
  exposedHeightMiddle = false;
  exposedHeightBottom = false;

  get heightArray(): HeightSelectOption[] {
    const options: HeightSelectOption[] = [];
    for (let id = 0; id <= 8000; id += 100) {
      options.push({ id, text: `${id} m` });
    }
    return options;
  }

  get lowerHeightArray() {
    return this.heightArray.filter((x) => this.exposedHeight1 === undefined || x.id < this.exposedHeight1);
  }

  ngOnInit() {
    this.setExposedHeights(this.exposedHeightComboTID);
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
      this.exposedHeightComboTID = 0;
    } else if (!top && middle && !bottom) {
      this.exposedHeightComboTID = 4;
    } else if (top && !middle && bottom) {
      this.exposedHeightComboTID = 3;
    } else if (bottom) {
      this.exposedHeightComboTID = 2;
    } else if (top) {
      this.exposedHeightComboTID = 1;
    } else {
      this.exposedHeightComboTID = undefined;
    }
  }

  applyChanges() {
    this.updateExposedHeightComboTID(this.exposedHeightTop, this.exposedHeightMiddle, this.exposedHeightBottom);
    if (!this.sholdUseExposedHight2()) {
      this.exposedHeight2 = undefined;
    }
    this.exposedHeightComboTIDChange.emit(this.exposedHeightComboTID);
    this.exposedHeight1Change.emit(this.exposedHeight1);
    this.exposedHeight2Change.emit(this.exposedHeight2);
  }
}
