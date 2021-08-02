import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OfflineMapPage } from './offline-map.page';
import { MapModule } from 'src/app/modules/map/map.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { OfflinePackageModalComponent } from './offline-package-modal.component';

const routes: Routes = [
  {
    path: '',
    component: OfflineMapPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MapModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [OfflineMapPage, OfflinePackageModalComponent]
})
export class OfflineMapPageModule {}
