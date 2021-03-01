import { NgModule } from '@angular/core';
import { SetDamageLocationPage } from './set-damage-location.page';
import { SharedComponentsModule } from '../../shared-components.module';

@NgModule({
  imports: [SharedComponentsModule],
  declarations: [SetDamageLocationPage],
  entryComponents: [SetDamageLocationPage]
})
export class SetDamageLocationPageModule {}
