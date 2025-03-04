import { Type } from '@angular/core';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api';

export interface RegistrationViewConfig {
  component: Type<any>;
  isEmpty: (registration: RegistrationViewModel) => boolean;
  getInputs: (registration: RegistrationViewModel) => any;
}
