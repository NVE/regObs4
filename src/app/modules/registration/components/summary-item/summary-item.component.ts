import { Component, OnInit, Input } from '@angular/core';
import { PictureRequestDto } from '../../../regobs-api/models';
import { ISummaryItem } from './summary-item.model';

@Component({
  selector: 'app-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss']
})
export class SummaryItemComponent implements OnInit {

  @Input() item: ISummaryItem;

  constructor() { }

  async ngOnInit() {

  }
}
