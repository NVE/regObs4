import { Component, OnInit, Input } from '@angular/core';
import { Summary } from '@varsom-regobs-common/regobs-api';
import { SummaryType } from '../../../core/models/summmary-type.enum';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  @Input() summaries: Summary[];
  @Input() showHeaders = true;

  SummaryType = SummaryType;

  constructor() {}

  ngOnInit() {}
}
