import { IonLabel } from '@ionic/angular/standalone';
import { Component, Input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-competence',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.scss'],
  imports: [IonLabel, NgFor, NgIf, SvgIconComponent, TranslateModule],
})
export class CompetenceComponent {
  readonly maxCompetenceLevel = 5;
  @Input() competenceLevelName: string = null;
  @Input() starCount = 0;
}
