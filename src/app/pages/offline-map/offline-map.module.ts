import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { OfflineMapPage } from './offline-map.page';
import { MapModule } from 'src/app/modules/map/map.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { OfflinePackageModalComponent } from './offline-package-modal/offline-package-modal.component';

const routes: Routes = [
  {
    path: '',
    component: OfflineMapPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MapModule,
    SharedModule,
    OfflineMapPage,
    OfflinePackageModalComponent,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class OfflineMapPageModule {}
