import { Component, OnInit, Input, NgZone } from '@angular/core';
import { SummaryItemService } from '../../services/summary-item.service';
import { IRegistration } from '../../models/registration.model';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-buttons',
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.scss']
})
export class NavigationButtonsComponent implements OnInit {

  @Input() registration: IRegistration;
  nextUrl: string;
  nextText: string;
  previousUrl: string;
  previousText: string;

  constructor(
    private summaryItemService: SummaryItemService,
    private router: Router, private ngZone: NgZone) { }

  async ngOnInit() {
    const currentUrl = this.router.url;
    const summaryItems = await this.summaryItemService.getSummaryItems(this.registration);
    const currentItem = summaryItems.find((x) => x.href === currentUrl);
    this.ngZone.run(() => {
      if (currentItem) {
        const index = summaryItems.indexOf(currentItem);
        if (index > 0) {
          this.previousUrl = summaryItems[index - 1].href;
          this.previousText = summaryItems[index - 1].title;
        }
        const nextIndex = index + 1;
        if (nextIndex < summaryItems.length) {
          this.nextUrl = summaryItems[nextIndex].href;
          this.nextText = summaryItems[nextIndex].title;
        }
      }
    });
  }

}
