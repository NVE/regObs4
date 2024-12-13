import { NgModule } from '@angular/core';
import { KdvDescriptionPipe } from './pipes/kdvDescription.pipe';

const PIPES = [KdvDescriptionPipe];

@NgModule({
  imports: [...PIPES],
  exports: PIPES,
})
export class RegobsRegistrationPipesModule {}

export { KdvDescriptionPipe } from './pipes/kdvDescription.pipe';
