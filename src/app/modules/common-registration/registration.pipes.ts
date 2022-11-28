import { NgModule } from '@angular/core';
import { KdvDescriptionPipe } from './pipes/kdvDescription.pipe';

const PIPES = [
  KdvDescriptionPipe,
];

@NgModule({
  declarations: PIPES,
  imports: [],
  exports: PIPES,
})
export class RegobsRegistrationPipesModule {}

export { KdvDescriptionPipe } from './pipes/kdvDescription.pipe';
