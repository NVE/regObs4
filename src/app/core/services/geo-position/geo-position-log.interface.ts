import { Geoposition } from '@ionic-native/geolocation/ngx';

export interface GeoPositionLog {
    status: 'StartGpsTracking' | 'StopGpsTracking' | 'PositionUpdate' | 'PositionError';
    highAccuracyEnabled: boolean;
    pos?: Geoposition;
    err?: PositionError;
}
