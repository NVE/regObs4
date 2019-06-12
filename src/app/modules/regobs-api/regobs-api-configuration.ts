/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for regobsApi services
 */
@Injectable({
  providedIn: 'root',
})
export class RegobsApiConfiguration {
  rootUrl: string = 'https://test-api.regobs.no/app_v4';
}

export interface RegobsApiConfigurationInterface {
  rootUrl?: string;
}
