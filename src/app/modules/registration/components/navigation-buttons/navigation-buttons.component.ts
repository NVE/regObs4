import { Component, OnInit, Input, NgZone } from '@angular/core';
import { SummaryItemService } from '../../services/summary-item.service';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { Router } from '@angular/router';
import { ISummaryItem } from '../summary-item/summary-item.model';

@Component({
  selector: 'app-navigation-buttons',
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.scss']
})
export class NavigationButtonsComponent implements OnInit {
  @Input() draft: RegistrationDraft;
  next: ISummaryItem;
  previous: ISummaryItem;

  constructor(
    private summaryItemService: SummaryItemService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  async ngOnInit() {
    const currentUrl = this.router.url;
    const prevAndNext = await this.summaryItemService.getPreviousAndNext(this.draft, currentUrl);
    this.ngZone.run(() => {
      if (prevAndNext.next) {
        this.next = prevAndNext.next;
      }
      if (prevAndNext.previous) {
        this.previous = prevAndNext.previous;
      }
    });
  }

  goBack() {
    this.summaryItemService.navigateTo(this.draft, this.previous, 'back');
  }

  goForward() {
    this.summaryItemService.navigateTo(this.draft, this.next, 'forward');
  }
}
