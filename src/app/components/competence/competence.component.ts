import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-competence',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.scss'],
})
export class CompetenceComponent {
  readonly maxCompetenceLevel = 5;
  @Input() competenceLevelName: string = null;
  @Input() starCount = 0;
}
