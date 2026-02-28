import { IonGrid, IonRow, IonCol, IonIcon, IonText, IonButton } from '@ionic/angular/standalone';
import { Component, OnInit, inject, input, signal } from '@angular/core';
import { SummaryItemService } from '../../services/summary-item.service';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { Router } from '@angular/router';
import { ISummaryItem } from '../summary-item/summary-item.model';

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
  imports: [IonButton, IonCol, IonGrid, IonIcon, IonRow, IonText, TranslatePipe],
})
export class NavigationButtonsComponent implements OnInit {
  private summaryItemService = inject(SummaryItemService);
  private router = inject(Router);

  draft = input.required<RegistrationDraft>();
  next = signal<ISummaryItem | undefined>(undefined);
  previous = signal<ISummaryItem | undefined>(undefined);

  constructor() {
    addIcons({ arrowBack, arrowForward });
  }

  async ngOnInit() {
    const currentUrl = this.router.url;
    const prevAndNext = await this.summaryItemService.getPreviousAndNext(this.draft(), currentUrl);
    if (prevAndNext.next) {
      this.next.set(prevAndNext.next);
    }
    if (prevAndNext.previous) {
      this.previous.set(prevAndNext.previous);
    }
  }

  goBack() {
    const prev = this.previous();
    if (prev) {
      this.summaryItemService.navigateTo(this.draft(), prev, 'back');
    }
  }

  goForward() {
    const nxt = this.next();
    if (nxt) {
      this.summaryItemService.navigateTo(this.draft(), nxt, 'forward');
    }
  }
}
