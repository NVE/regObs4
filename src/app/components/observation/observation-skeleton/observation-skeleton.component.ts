import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SvgIconComponent } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-observation-skeleton',
  templateUrl: './observation-skeleton.component.html',
  styleUrls: ['./observation-skeleton.component.scss'],
  imports: [IonicModule, SvgIconComponent, TranslateModule],
})
export class ObservationSkeletonComponent {}
