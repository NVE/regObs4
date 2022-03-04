import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
import { SentListComponent } from './components/sent-list/sent-list.component';

@Component({
  selector: 'app-my-observations',
  templateUrl: './my-observations.page.html',
  styleUrls: ['./my-observations.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyObservationsPage {
  @ViewChild(IonContent, { static: true }) content: IonContent;
  @ViewChild(IonInfiniteScroll, { static: false }) scroll: IonInfiniteScroll;
  @ViewChild(SentListComponent, { static: false })
  sentListComponent: SentListComponent;

  refreshFunc = this.refresh.bind(this);
  draftIsEmpty = false;
  sentRegistrationsIsEmpty = false;

  async refresh(cancelPromise?: Promise<void>): Promise<void> {
    await this.sentListComponent.refresh(cancelPromise);
  }

  refreshDraftEmptyState(isEmpty: boolean): void {
    this.draftIsEmpty = isEmpty;
  }

  refreshSentEmptyState(isEmpty: boolean): void {
    this.sentRegistrationsIsEmpty = isEmpty;
  }
}
