import { NgModule } from '@angular/core';
import { MetersToCmPipe } from './pipes/metersToCm.pipe';

const PIPES = [
  MetersToCmPipe,
];

@NgModule({
  declarations: PIPES,
  imports: [],
  exports: PIPES,
})
export class RegobsCorePipesModule {}

export { MetersToCmPipe } from './pipes/metersToCm.pipe';
