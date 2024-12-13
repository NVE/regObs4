import { NgModule } from '@angular/core';
import { GpsDebugComponent } from './components/gps-debug/gps-debug.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, GpsDebugComponent],
  exports: [GpsDebugComponent],
})
export class GpsDebugModule {}
