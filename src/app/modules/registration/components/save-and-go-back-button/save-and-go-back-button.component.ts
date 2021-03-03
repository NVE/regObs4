import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IRegistration, RegistrationTid } from '@varsom-regobs-common/registration;
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-save-and-go-back-button',
  templateUrl: './save-and-go-back-button.component.html',
  styleUrls: ['./save-and-go-back-button.component.scss']
})
export class SaveAndGoBackButtonComponent implements OnInit {
  @Input() registration: IRegistration;
  @Input() registrationTid: RegistrationTid;
  @Output() reset = new EventEmitter();
  @Input() isEmpty: boolean;

  get isEmptyRegistrationEmpty() {
    if (this.isEmpty !== undefined) {
      return this.isEmpty;
    } else {
      return this.registrationService.isEmpty(
        this.registration,
        this.registrationTid
      );
    }
  }

  constructor(
    private navContoller: NavController,
    private registrationService: RegistrationService
  ) {}

  async ngOnInit() {}

  async goBack() {
    this.navContoller.navigateBack('registration/edit/' + this.registration.id);
  }

  doReset() {
    this.reset.emit();
  }
}
