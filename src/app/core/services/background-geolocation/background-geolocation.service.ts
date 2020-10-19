import { Injectable } from '@angular/core';

@Injectable()
export abstract class BackgroundGeolocationService {
  abstract start(): void;
  abstract stop(): void;
  abstract isRunning(): Promise<boolean>;
}
