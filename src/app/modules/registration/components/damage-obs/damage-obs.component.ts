import { Component, OnInit, Input, Output, EventEmitter, NgZone, ChangeDetectorRef } from '@angular/core';
import { IRegistration } from '../../models/registration.model';
import { RegistrationService } from '../../services/registration.service';
import { NavController } from '@ionic/angular';
import { RegistrationTid } from '../../models/registrationTid.enum';

@Component({
  selector: 'app-damage-obs',
  templateUrl: './damage-obs.component.html',
  styleUrls: ['./damage-obs.component.scss']
})
export class DamageObsComponent implements OnInit {

  @Input() damageTypeId: number;
  @Input() damageTypeName: string;
  @Input() registration: IRegistration;
  @Input() registrationTid: RegistrationTid;
  @Output() registrationChange = new EventEmitter();

  isSelected: boolean;

  get damageObs() {
    return this.registration.DamageObs.find((x) => x.DamageTypeTID === this.damageTypeId);
  }

  constructor(
    private registrationService: RegistrationService,
    private navController: NavController,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    if (this.damageObs) {
      this.isSelected = true;
    } else {
      this.isSelected = false;
    }
    if (this.damageObs && this.damageObs.Pictures === undefined) {
      this.damageObs.Pictures = [];
      this.registrationChange.emit(this.registration);
    }
  }

  toggleDamageType() {
    this.isSelected = !this.isSelected;
    this.cdr.detectChanges();
  }

  onCheckedChange() {
    if (this.isSelected) {
      if (!this.damageObs) {
        this.registration.DamageObs.push({
          DamageTypeTID: this.damageTypeId,
          Pictures: [],
        });
      }
    } else {
      this.registration.DamageObs = this.registration.DamageObs.filter((x) => x.DamageTypeTID !== this.damageTypeId);
    }
    this.registrationChange.emit(this.registration);
  }

  async setDamagePosition() {
    await this.registrationService.saveRegistration(this.registration);
    this.navController.navigateForward(`registration/set-damage-location/${this.damageTypeId}`);
    // TODO: Create modal params instead
  }
}
