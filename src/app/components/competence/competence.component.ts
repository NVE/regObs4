import { Component, Input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-competence',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.scss'],
  imports: [NgIf, NgFor, SvgIconComponent, IonicModule, TranslateModule],
})
export class CompetenceComponent {
  readonly maxCompetenceLevel = 5;
  @Input() competenceLevelName: string = null;
  @Input() starCount = 0;
}
