import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
import { SentListComponent } from './components/sent-list/sent-list.component';

@Component({
  selector: 'app-my-observations',
  templateUrl: './my-observations.page.html',
  styleUrls: ['./my-observations.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyObservationsPage {
  @ViewChild(IonContent, { static: true }) content: IonContent;
  @ViewChild(IonInfiniteScroll, { static: false }) scroll: IonInfiniteScroll;
  @ViewChild(SentListComponent, { static: false })
  sentListComponent: SentListComponent;

  refreshFunc = this.refresh.bind(this);
  draftIsEmpty = false;
  sentRegistrationsIsEmpty = false;

  ionViewDidEnter() {
    this.content.scrollToTop();
  }

  refresh(): void {
    this.sentListComponent.refresh();
  }

  refreshDraftEmptyState(isEmpty: boolean): void {
    this.draftIsEmpty = isEmpty;
  }

  refreshSentEmptyState(isEmpty: boolean): void {
    this.sentRegistrationsIsEmpty = isEmpty;
  }
}
