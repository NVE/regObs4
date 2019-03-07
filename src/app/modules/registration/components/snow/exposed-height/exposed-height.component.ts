import { Component, OnInit, Input, Output, NgZone, EventEmitter } from '@angular/core';

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

  heightArray = [
    2500, 2400, 2300, 2200, 2100,
    2000, 1900, 1800, 1700, 1600,
    1500, 1400, 1300, 1200, 1100,
    1000, 900, 800, 700, 600,
    500, 400, 300, 200, 100, 0
  ];

  lowerHeightArray = [...this.heightArray];

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    this.setExposedHeights(this.exposedHeightComboTID);
  }

  setExposedHeights(exposedHeightComboTID: number) {
    if (exposedHeightComboTID === 0) {
      this.exposedHeightTop = true;
      this.exposedHeightMiddle = true;
      this.exposedHeightBottom = true;
    } else if (exposedHeightComboTID === 1) { // Hvit nederst
      this.exposedHeightTop = true;
      this.exposedHeightMiddle = true;
      this.exposedHeightBottom = false;
    } else if (exposedHeightComboTID === 2) { // Svart nederst
      this.exposedHeightTop = false;
      this.exposedHeightMiddle = false;
      this.exposedHeightBottom = true;
    } else if (exposedHeightComboTID === 3) { // Hvit i midten
      this.exposedHeightTop = true;
      this.exposedHeightMiddle = false;
      this.exposedHeightBottom = true;
    } else if (exposedHeightComboTID === 4) { // Svart i midten
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
    return (this.exposedHeightTop && this.exposedHeightBottom && !this.exposedHeightMiddle)
      || (!this.exposedHeightTop && !this.exposedHeightBottom && this.exposedHeightMiddle);
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

  private updateHight2SelectOptions() {
    setTimeout(() => {
      this.lowerHeightArray = undefined;
      setTimeout(() => {
        this.lowerHeightArray = this.heightArray.filter((x) => x < (this.exposedHight1 || 9999));
      });
    });
  }

  applyChanges() {
    this.updateHight2SelectOptions();
    this.ngZone.run(() => {
      this.updateExposedHeightComboTID(this.exposedHeightTop, this.exposedHeightMiddle, this.exposedHeightBottom);
      if (!this.sholdUseExposedHight2()) {
        this.exposedHight2 = undefined;
      }
      this.exposedHeightComboTIDChange.emit(this.exposedHeightComboTID);
      this.exposedHight1Change.emit(this.exposedHight1);
      this.exposedHight2Change.emit(this.exposedHight2);
    });
  }

}
