import { RegistrationDraft } from './draft-model';

interface InitRegistration extends Partial<RegistrationDraft['registration']> {
  GeoHazardTID: RegistrationDraft['registration']['GeoHazardTID'];
}

export interface InitDraft extends Omit<RegistrationDraft, 'registration'> {
  registration: InitRegistration;
}
