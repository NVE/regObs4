import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SnowProfilePage } from './snow-profile.page';
import { SharedComponentsModule } from '../../../shared-components.module';
import { CompressionTestComponent } from '../../../components/snow/snow-profile/compression-test/compression-test.component';
import { SnowDensityComponent } from '../../../components/snow/snow-profile/snow-density/snow-density.component';
import { SnowTempComponent } from '../../../components/snow/snow-profile/snow-temp/snow-temp.component';
import { StratProfileComponent } from '../../../components/snow/snow-profile/strat-profile/strat-profile.component';
// tslint:disable-next-line:max-line-length
import { StratProfileModalPageModule } from '../../../components/snow/snow-profile/strat-profile/strat-profile-modal/strat-profile-modal.module';
import { FullscreenImageModalPageModule } from '../../../../../pages/modal-pages/fullscreen-image-modal/fullscreen-image-modal.module';
import { SnowTempModalPageModule } from '../../../components/snow/snow-profile/snow-temp/snow-temp-modal/snow-temp-modal.module';
// tslint:disable-next-line:max-line-length
import { SnowDensityModalPageModule } from '../../../components/snow/snow-profile/snow-density/snow-density-modal/snow-density-modal.module';
// tslint:disable-next-line:max-line-length
import { CompressionTestListModalPageModule } from '../../../components/snow/snow-profile/compression-test/compression-test-list-modal/compression-test-list-modal.module';

const routes: Routes = [
  {
    path: '',
    component: SnowProfilePage
  }
];

@NgModule({
  imports: [
    SharedComponentsModule,
    StratProfileModalPageModule,
    SnowTempModalPageModule,
    SnowDensityModalPageModule,
    CompressionTestListModalPageModule,
    FullscreenImageModalPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SnowProfilePage,
    CompressionTestComponent,
    SnowDensityComponent,
    SnowTempComponent,
    StratProfileComponent
  ]
})
export class SnowProfilePageModule {}
