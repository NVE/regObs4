import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IRegistration } from '../../models/registration.model';

@Component({
  selector: 'app-damage-obs',
  templateUrl: './damage-obs.component.html',
  styleUrls: ['./damage-obs.component.scss']
})
export class DamageObsComponent implements OnInit {

  @Input() damageTypeId: number;
  @Input() damageTypeName: string;
  @Input() registration: IRegistration;
  @Output() registrationChange = new EventEmitter();

  get isSelected() {
    return !!this.damageObs;
  }

  set isSelected(value: boolean) {
    if (value) {
      if (!this.damageObs) {
        this.registration.DamageObs.push({
          DamageTypeTID: this.damageTypeId,
          Pictures: [],
        });
      }
    } else {
      this.registration.DamageObs = this.registration.DamageObs.filter((x) => x.DamageTypeTID !== this.damageTypeId);
    }
  }

  get damageObs() {
    return this.registration.DamageObs.find((x) => x.DamageTypeTID === this.damageTypeId);
  }

  constructor() { }

  ngOnInit() {
    if (this.damageObs && this.damageObs.Pictures === undefined) {
      this.damageObs.Pictures = [];
    }
  }

  toggleDamageType() {
    this.isSelected = !this.isSelected;
  }
}
