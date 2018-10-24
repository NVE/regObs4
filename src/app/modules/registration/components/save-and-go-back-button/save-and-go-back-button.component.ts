import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IRegistration } from '../../models/registration.model';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-save-and-go-back-button',
  templateUrl: './save-and-go-back-button.component.html',
  styleUrls: ['./save-and-go-back-button.component.scss']
})
export class SaveAndGoBackButtonComponent implements OnInit {

  @Input() registration: IRegistration;

  constructor(
    private navContoller: NavController,
    private registrationService: RegistrationService,
  ) { }

  ngOnInit() {
  }

  async goBack() {
    // TODO: If changed and not new and empty
    await this.registrationService.saveRegistration(this.registration);
    this.navContoller.goBack();
  }
}
