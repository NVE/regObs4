import { TestBed } from '@angular/core/testing';

import { WeatherSummaryProvider } from './weather.summary-provider';

xdescribe('Weather.SummaryProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherSummaryProvider = TestBed.get(WeatherSummaryProvider);
    expect(service).toBeTruthy();
  });
});
