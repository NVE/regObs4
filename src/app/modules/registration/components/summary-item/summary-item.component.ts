import { Component, OnInit, Input } from '@angular/core';
import { PictureRequestDto } from '../../../regobs-api/models';

@Component({
  selector: 'app-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss']
})
export class SummaryItemComponent implements OnInit {

  @Input() title: string;
  @Input() subTitle: string;
  @Input() subTitleFormat?: 'string' | 'date';
  @Input() hasData: boolean;
  @Input() href: string;
  @Input() images: PictureRequestDto[];

  constructor() { }

  async ngOnInit() {

  }
}
