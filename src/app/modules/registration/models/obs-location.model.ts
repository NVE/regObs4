import { ObsLocationDto } from '../../regobs-api/models';

export interface ObsLocation extends ObsLocationDto {
    calculatedLocationName?: string;
}
