import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { IonContent, IonInfiniteScroll, IonicModule } from '@ionic/angular';
import { SentListComponent } from './components/sent-list/sent-list.component';
import { HeaderColorDirective } from '../../modules/shared/directives/header-color/header-color.directive';
import { RefreshWithCancelComponent } from '../../modules/shared/components/refresh-with-cancel/refresh-with-cancel.component';
import { DraftListComponent } from './components/draft-list/draft-list.component';
import { NgIf } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { AddMenuComponent } from '../../modules/shared/components/add-menu/add-menu.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-my-observations',
  templateUrl: './my-observations.page.html',
  styleUrls: ['./my-observations.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    HeaderColorDirective,
    RefreshWithCancelComponent,
    DraftListComponent,
    SentListComponent,
    NgIf,
    SvgIconComponent,
    AddMenuComponent,
    TranslateModule,
  ],
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
