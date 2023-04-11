import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewPage } from './overview.page';
import { SendButtonComponent } from '../../components/send-button/send-button.component';
import { SummaryItemComponent } from '../../components/summary-item/summary-item.component';
import { SharedComponentsModule } from '../../shared-components.module';
import { FailedRegistrationComponent } from '../../components/failed-registration/failed-registration.component';
import { SaveAsDraftRouteGuard } from '../save-as-draft.guard';
import { VersionConflictComponent } from '../../components/version-conflict/version-conflict.component';
import { GoneRegistrationComponent } from '../../components/gone-registration/gone-registration.component';
import { SimpleSnowObsComponent } from '../../components/snow/simple-snow-obs/simple-snow-obs.component';
import { SimpleWaterObsComponent } from '../../components/water/simple-water-obs/simple-water-obs.component';
import { KdvIconSelectComponent } from '../../components/kdv-icon-select/kdv-icon-select.component';
import { ThumbnailsComponent } from '../../components/thumbnails/thumbnails.component';
import { EditImagesPage } from '../../components/edit-images/edit-images.page';
import { EditImagesBarComponent } from '../../components/snow/simple-snow-obs/edit-images-bar/edit-images-bar.component';
import { CoachMarksSimpleObsComponent } from 'src/app/components/coach-marks/coach-marks-simple-obs/coach-marks-simple-obs.component';

const routes: Routes = [
  {
    path: '',
    component: OverviewPage,
    canDeactivate: [SaveAsDraftRouteGuard],
  },
];

@NgModule({
  imports: [SharedComponentsModule, RouterModule.forChild(routes)],
  declarations: [
    OverviewPage,
    SendButtonComponent,
    SummaryItemComponent,
    ThumbnailsComponent,
    FailedRegistrationComponent,
    VersionConflictComponent,
    GoneRegistrationComponent,
    SimpleSnowObsComponent,
    SimpleWaterObsComponent,
    CoachMarksSimpleObsComponent,
    EditImagesBarComponent,
    EditImagesPage,
    KdvIconSelectComponent,
  ],
})
export class OverviewPageModule {}
