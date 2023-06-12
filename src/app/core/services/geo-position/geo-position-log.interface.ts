import { Position } from '@capacitor/geolocation';

export interface GeoPositionLog {
  timestamp: number;
  status: 'StartGpsTracking' | 'StopGpsTracking' | 'PositionUpdate' | 'PositionError';
  highAccuracyEnabled: boolean;
  pos?: Position;
  err?: PositionError;
}

/**
 * Copied from @awesome-cordova-plugins/geolocation/ngx
 */
export interface PositionError {
  /**
   * A code that indicates the error that occurred
   */
  code: number;
  /**
   * A message that can describe the error that occurred
   */
  message: string;
}
