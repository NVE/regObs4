import { Geoposition, PositionError } from '@ionic-native/geolocation/ngx';

export interface GeoPositionLog {
  timestamp: number;
  status:
    | 'StartGpsTracking'
    | 'StopGpsTracking'
    | 'PositionUpdate'
    | 'PositionError';
  highAccuracyEnabled: boolean;
  pos?: Geoposition;
  err?: PositionError;
}
