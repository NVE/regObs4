import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-competence',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.scss']
})
export class CompetenceComponent implements OnInit {
  readonly maxCompetenceLevel = 5;

  @Input() competenceLevel = 0;

  constructor() {}

  ngOnInit() {}
}
