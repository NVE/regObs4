import {
  Component,
  OnInit,
  Input,
  Output,
  NgZone,
  EventEmitter
} from '@angular/core';
import { SelectOption } from '../../../../shared/components/input/select/select-option.model';

@Component({
  selector: 'app-exposed-height',
  templateUrl: './exposed-height.component.html',
  styleUrls: ['./exposed-height.component.scss']
})
export class ExposedHeightComponent implements OnInit {
  @Input() exposedHeightComboTID: number;
  @Output() exposedHeightComboTIDChange = new EventEmitter();
  @Input() exposedHight1: number;
  @Output() exposedHight1Change = new EventEmitter();
  @Input() exposedHight2: number;
  @Output() exposedHight2Change = new EventEmitter();

  exposedHeightTop: boolean;
  exposedHeightMiddle: boolean;
  exposedHeightBottom: boolean;

  get heightArray(): SelectOption[] {
    const options: SelectOption[] = [];
    for (let id = 0; id <= 8000; id += 100) {
      options.push({ id, text: `${id} m` });
    }
    return options;
  }

  get lowerHeightArray() {
    return this.heightArray.filter(
      (x) => this.exposedHight1 === undefined || x.id < this.exposedHight1
    );
  }

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.setExposedHeights(this.exposedHeightComboTID);
  }

  setExposedHeights(exposedHeightComboTID: number) {
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
      (this.exposedHeightTop &&
        this.exposedHeightBottom &&
        !this.exposedHeightMiddle) ||
      (!this.exposedHeightTop &&
        !this.exposedHeightBottom &&
        this.exposedHeightMiddle)
    );
  }

  private updateExposedHeightComboTID(
    top: boolean,
    middle: boolean,
    bottom: boolean
  ) {
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
    this.updateExposedHeightComboTID(
      this.exposedHeightTop,
      this.exposedHeightMiddle,
      this.exposedHeightBottom
    );
    if (!this.sholdUseExposedHight2()) {
      this.exposedHight2 = undefined;
    }
    this.exposedHeightComboTIDChange.emit(this.exposedHeightComboTID);
    this.exposedHight1Change.emit(this.exposedHight1);
    this.exposedHight2Change.emit(this.exposedHight2);
  }
}
