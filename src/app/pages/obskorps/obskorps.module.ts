import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObskorpsPageRoutingModule } from './obskorps-routing.module';

import { ObskorpsPage } from './obskorps.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ObskorpsPageRoutingModule, SharedModule],
  declarations: [ObskorpsPage],
})
export class ObskorpsPageModule {}
