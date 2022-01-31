import { CreateTripDto } from 'src/app/modules/common-regobs-api/models';

export interface LegacyTrip {
  id: string;
  timestamp: number;
  request: CreateTripDto;
}
