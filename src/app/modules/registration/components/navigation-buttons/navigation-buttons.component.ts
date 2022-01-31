import { Component, OnInit, Input, NgZone } from '@angular/core';
import { SummaryItemService } from '../../services/summary-item.service';
import { IRegistration } from 'src/app/modules/common-registration/registration.models';
import { Router } from '@angular/router';
import { ISummaryItem } from '../summary-item/summary-item.model';

@Component({
  selector: 'app-navigation-buttons',
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.scss']
})
export class NavigationButtonsComponent implements OnInit {
  @Input() registration: IRegistration;
  next: ISummaryItem;
  previous: ISummaryItem;

  constructor(
    private summaryItemService: SummaryItemService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  async ngOnInit() {
    const currentUrl = this.router.url;
    const prevAndNext = await this.summaryItemService.getPreviousAndNext(
      this.registration,
      currentUrl
    );
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
    this.summaryItemService.navigateTo(
      this.registration,
      this.previous,
      'back'
    );
  }

  goForward() {
    this.summaryItemService.navigateTo(this.registration, this.next, 'forward');
  }
}
