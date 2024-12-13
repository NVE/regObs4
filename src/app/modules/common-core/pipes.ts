import { NgModule } from '@angular/core';
import { MetersToCmPipe } from './pipes/metersToCm.pipe';

const PIPES = [MetersToCmPipe];

@NgModule({
  imports: [...PIPES],
  exports: PIPES,
})
export class RegobsCorePipesModule {}

export { MetersToCmPipe } from './pipes/metersToCm.pipe';
