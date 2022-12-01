import { Position } from '@capacitor/geolocation';

export interface GeoPositionLog {
  timestamp: number;
  status: 'StartGpsTracking' | 'StopGpsTracking' | 'PositionUpdate' | 'PositionError';
  highAccuracyEnabled: boolean;
  pos?: Position;
  err?: PositionError;
}

/**
 * Copied from @ionic-native/geolocation/ngx
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
