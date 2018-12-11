import { CreateTripDto } from '../../../modules/regobs-api/models';

export interface LegacyTrip {
    id: string;
    timestamp: number;
    request: CreateTripDto;
}
