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

  heightArray: SelectOption[] = [
    { id: 8000, text: '8000' },
    { id: 7900, text: '7900' },
    { id: 7800, text: '7800' },
    { id: 7700, text: '7700' },
    { id: 7600, text: '7600' },
    { id: 7500, text: '7500' },
    { id: 7400, text: '7400' },
    { id: 7300, text: '7300' },
    { id: 7200, text: '7200' },
    { id: 7100, text: '7100' },
    { id: 7000, text: '7000' },
    { id: 6900, text: '6900' },
    { id: 6800, text: '6800' },
    { id: 6700, text: '6700' },
    { id: 6600, text: '6600' },
    { id: 6500, text: '6500' },
    { id: 6400, text: '6400' },
    { id: 6300, text: '6300' },
    { id: 6200, text: '6200' },
    { id: 6100, text: '6100' },
    { id: 6000, text: '6000' },
    { id: 5900, text: '5900' },
    { id: 5800, text: '5800' },
    { id: 5700, text: '5700' },
    { id: 5600, text: '5600' },
    { id: 5500, text: '5500' },
    { id: 5400, text: '5400' },
    { id: 5300, text: '5300' },
    { id: 5200, text: '5200' },
    { id: 5100, text: '5100' },
    { id: 5000, text: '5000' },
    { id: 4900, text: '4900' },
    { id: 4800, text: '4800' },
    { id: 4700, text: '4700' },
    { id: 4600, text: '4600' },
    { id: 4500, text: '4500' },
    { id: 4400, text: '4400' },
    { id: 4300, text: '4300' },
    { id: 4200, text: '4200' },
    { id: 4100, text: '4100' },
    { id: 4000, text: '4000' },
    { id: 3900, text: '3900' },
    { id: 3800, text: '3800' },
    { id: 3700, text: '3700' },
    { id: 3600, text: '3600' },
    { id: 3500, text: '3500' },
    { id: 3400, text: '3400' },
    { id: 3300, text: '3300' },
    { id: 3200, text: '3200' },
    { id: 3100, text: '3100' },
    { id: 3000, text: '3000' },
    { id: 2900, text: '2900' },
    { id: 2800, text: '2800' },
    { id: 2700, text: '2700' },
    { id: 2600, text: '2600' },
    { id: 2500, text: '2500' },
    { id: 2400, text: '2400' },
    { id: 2300, text: '2300' },
    { id: 2200, text: '2200' },
    { id: 2100, text: '2100' },
    { id: 2000, text: '2000' },
    { id: 1900, text: '1900' },
    { id: 1800, text: '1800' },
    { id: 1700, text: '1700' },
    { id: 1600, text: '1600' },
    { id: 1500, text: '1500' },
    { id: 1400, text: '1400' },
    { id: 1300, text: '1300' },
    { id: 1200, text: '1200' },
    { id: 1100, text: '1100' },
    { id: 1000, text: '1000' },
    { id: 900, text: '900' },
    { id: 800, text: '800' },
    { id: 700, text: '700' },
    { id: 600, text: '600' },
    { id: 500, text: '500' },
    { id: 400, text: '400' },
    { id: 300, text: '300' },
    { id: 200, text: '200' },
    { id: 100, text: '100' },
    { id: 0, text: '0' }
  ];

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
