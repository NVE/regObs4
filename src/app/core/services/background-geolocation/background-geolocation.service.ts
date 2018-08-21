import { BackgroundGeolocationLocation } from './background-geolocation.model';

export abstract class BackgroundGeolocationService {
  abstract start(): void;
  abstract stop(): void;
  abstract isRunning(): Promise<boolean>;
}
