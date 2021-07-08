import { CreateTripDto } from '@varsom-regobs-common/regobs-api';

export interface LegacyTrip {
  id: string;
  timestamp: number;
  request: CreateTripDto;
}
