import { Type } from '@angular/core';
import { RegistrationTid } from 'src/app/modules/common-registration/models/registration-tid.enum';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api';

export interface RegistrationViewConfig {
  /**
   * ID til skjemaet som skal vises
   */
  tid: RegistrationTid;

  /**
   * Hvilken komponent som skal vises
   */
  component: Type<any>;

  /**
   * Funksjon som tar i mot en registrering og sier fra om komponenten bør rendres eller ikke.
   * (Det er i alle fall det den brukes til i dag. Kunne kanskje endra navn til "shouldRenderComponent", eller noe.).
   *
   * @param registration Registrering / observasjon
   */
  isEmpty: (registration: RegistrationViewModel) => boolean;

  /**
   * Funksjon som tar i mot en registrering og gjør klar inputs til komponenten.
   *
   * @param registration Registrering / observasjon
   * @returns Et objekt med alle inputs til komponenten.
   */
  getInputs: (registration: RegistrationViewModel) => any;
}
