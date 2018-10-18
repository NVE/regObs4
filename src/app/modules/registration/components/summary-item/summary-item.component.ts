import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { DateHelperService } from '../../../shared/services/date-helper.service';

@Component({
  selector: 'app-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss']
})
export class SummaryItemComponent implements OnInit, OnChanges {

  @Input() title: string;
  @Input() subTitle: string;
  @Input() subTitleFormat?: 'string' | 'date';
  @Input() hasData: boolean;
  @Input() href: string;

  subTitleFormatted: string;

  constructor(private dateHelperService: DateHelperService, private cdr: ChangeDetectorRef) { }

  async ngOnInit() {
    this.formatSubTitle();
  }

  private async formatSubTitle() {
    if (this.subTitleFormat === 'date') {
      this.subTitleFormatted = await this.dateHelperService.formatDateString(this.subTitle);
    } else {
      this.subTitleFormatted = this.subTitle;
    }
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formatSubTitle();
  }

}
