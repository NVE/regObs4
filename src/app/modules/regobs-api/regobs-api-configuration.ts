/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for regobsApi services
 */
@Injectable({
  providedIn: 'root',
})
export class RegobsApiConfiguration {
  rootUrl: string = 'http://localhost:40001';
}

export interface RegobsApiConfigurationInterface {
  rootUrl?: string;
}
