import { Component, ChangeDetectionStrategy, viewChild } from '@angular/core';
import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInfiniteScroll,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { SentListComponent } from './components/sent-list/sent-list.component';
import { HeaderColorDirective } from '../../modules/shared/directives/header-color/header-color.directive';
import { RefreshWithCancelComponent } from '../../modules/shared/components/refresh-with-cancel/refresh-with-cancel.component';
import { DraftListComponent } from './components/draft-list/draft-list.component';
import { NgIf } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { AddMenuComponent } from '../../modules/shared/components/add-menu/add-menu.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-my-observations',
  templateUrl: './my-observations.page.html',
  styleUrls: ['./my-observations.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AddMenuComponent,
    DraftListComponent,
    HeaderColorDirective,
    IonBackButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonRow,
    IonTitle,
    IonToolbar,
    NgIf,
    RefreshWithCancelComponent,
    SentListComponent,
    SvgIconComponent,
    TranslatePipe,
  ],
})
export class MyObservationsPage {
  readonly content = viewChild.required(IonContent);
  readonly sentListComponent = viewChild.required(SentListComponent);
  readonly scroll = viewChild(IonInfiniteScroll); // TODO: Denne er i en av underkomponentene, sjekk at det funker?

  refreshFunc = this.refresh.bind(this);
  draftIsEmpty = false;
  sentRegistrationsIsEmpty = false;

  ionViewDidEnter() {
    this.content().scrollToTop();
  }

  async refresh() {
    this.sentListComponent().refresh();
  }

  refreshDraftEmptyState(isEmpty: boolean): void {
    this.draftIsEmpty = isEmpty;
  }

  refreshSentEmptyState(isEmpty: boolean): void {
    this.sentRegistrationsIsEmpty = isEmpty;
  }
}
