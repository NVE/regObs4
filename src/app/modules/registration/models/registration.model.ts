import { CreateRegistrationRequestDto } from '../../regobs-api/models';
import { GeoHazard } from '../../../core/models/geo-hazard.enum';

export interface IRegistration extends CreateRegistrationRequestDto {
    geoHazard: GeoHazard;
}
