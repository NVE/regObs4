import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  NgZone
} from '@angular/core';

const EMPTY_EXPOSITION = '00000000';
const ALL_EXPOSITION = '11111111';

@Component({
  selector: 'app-valid-exposition',
  templateUrl: './valid-exposition.component.html',
  styleUrls: ['./valid-exposition.component.scss']
})
export class ValidExpositionComponent implements OnInit {
  @Input() validExposition: string;
  @Output() validExpositionChange = new EventEmitter();

  validExpositionCopy: string;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    if (!this.validExposition) {
      this.validExpositionCopy = EMPTY_EXPOSITION;
    } else {
      this.validExpositionCopy = this.validExposition;
    }
  }

  setExposition(index: number) {
    const existingValue = this.validExpositionCopy.substr(index, 1);
    const newValue = existingValue === '1' ? '0' : '1';
    this.validExpositionCopy =
      this.validExpositionCopy.substr(0, index) +
      newValue +
      this.validExpositionCopy.substr(index + 1);
    this.applyChanges();
  }

  toggleAllExpositions() {
    this.validExpositionCopy =
      this.validExpositionCopy === ALL_EXPOSITION
        ? EMPTY_EXPOSITION
        : ALL_EXPOSITION;
    this.applyChanges();
  }

  applyChanges() {
    this.ngZone.run(() => {
      if (this.validExpositionCopy === EMPTY_EXPOSITION) {
        this.validExposition = undefined;
      } else {
        this.validExposition = this.validExpositionCopy;
      }
      this.validExpositionChange.emit(this.validExposition);
    });
  }
}
