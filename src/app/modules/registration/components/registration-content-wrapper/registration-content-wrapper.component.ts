import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';

/**
 * Component with helptext, next / last form, save and go back buttons. Used to wrap every registration form.
 */
@Component({
  selector: 'app-registration-content-wrapper',
  templateUrl: './registration-content-wrapper.component.html',
  styleUrls: ['./registration-content-wrapper.component.scss']
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
