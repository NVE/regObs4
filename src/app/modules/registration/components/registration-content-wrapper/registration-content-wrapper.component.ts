import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { NgIf } from '@angular/common';
import { HelpTextComponent } from '../help-text/help-text.component';
import { NavigationButtonsComponent } from '../navigation-buttons/navigation-buttons.component';
import { SaveAndGoBackButtonComponent } from '../save-and-go-back-button/save-and-go-back-button.component';

/**
 * Component with helptext, next / last form, save and go back buttons. Used to wrap every registration form.
 */
@Component({
  selector: 'app-registration-content-wrapper',
  templateUrl: './registration-content-wrapper.component.html',
  styleUrls: ['./registration-content-wrapper.component.scss'],
  imports: [HelpTextComponent, IonCol, IonGrid, IonRow, NavigationButtonsComponent, NgIf, SaveAndGoBackButtonComponent],
})
export class RegistrationContentWrapperComponent {
  @Input() draft: RegistrationDraft;
  @Input() registrationTid: RegistrationTid;
  @Output() reset = new EventEmitter();
  @Input() isEmpty: boolean;

  emitReset() {
    this.reset.emit();
  }
}
