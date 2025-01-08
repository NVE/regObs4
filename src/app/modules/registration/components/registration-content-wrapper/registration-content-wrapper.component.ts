import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { Component, Output, EventEmitter, input } from '@angular/core';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { NgIf } from '@angular/common';
import { HelpTextComponent } from '../help-text/help-text.component';
import { NavigationButtonsComponent } from '../navigation-buttons/navigation-buttons.component';
import { SaveAndGoBackButtonComponent } from '../save-and-go-back-button/save-and-go-back-button.component';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';

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
  readonly draft = input.required<RegistrationDraft>();
  readonly registrationTid = input<RegistrationTid>();
  @Output() reset = new EventEmitter();

  emitReset() {
    this.reset.emit();
  }
}
