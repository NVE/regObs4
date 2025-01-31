import { IonLabel } from '@ionic/angular/standalone';
import { Component, input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-competence',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.scss'],
  imports: [IonLabel, NgFor, NgIf, SvgIconComponent, TranslatePipe],
})
export class CompetenceComponent {
  readonly maxCompetenceLevel = 5;
  readonly competenceLevelName = input<string>();
  readonly starCount = input<number>();
}
