import { IonGrid, IonRow, IonCol, IonIcon, IonText, IonButton } from '@ionic/angular/standalone';
import { Component, OnInit, NgZone, inject, input } from '@angular/core';
import { SummaryItemService } from '../../services/summary-item.service';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { Router } from '@angular/router';
import { ISummaryItem } from '../summary-item/summary-item.model';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { arrowBack, arrowForward } from 'ionicons/icons';

/**
 * Used to navigate from one registration form to previous or next form
 */
@Component({
  selector: 'app-navigation-buttons',
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.scss'],
  imports: [IonButton, IonCol, IonGrid, IonIcon, IonRow, IonText, NgIf, TranslatePipe],
})
export class NavigationButtonsComponent implements OnInit {
  private summaryItemService = inject(SummaryItemService);
  private router = inject(Router);
  private ngZone = inject(NgZone);

  draft = input.required<RegistrationDraft>();
  next?: ISummaryItem;
  previous?: ISummaryItem;

  constructor() {
    addIcons({ arrowBack, arrowForward });
  }

  async ngOnInit() {
    const currentUrl = this.router.url;
    const prevAndNext = await this.summaryItemService.getPreviousAndNext(this.draft(), currentUrl);
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
    if (this.previous) {
      this.summaryItemService.navigateTo(this.draft(), this.previous, 'back');
    }
  }

  goForward() {
    if (this.next) {
      this.summaryItemService.navigateTo(this.draft(), this.next, 'forward');
    }
  }
}
