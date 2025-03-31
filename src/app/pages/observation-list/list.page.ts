import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../modules/shared/components/header/header.component';
import { AddMenuComponent } from '../../modules/shared/components/add-menu/add-menu.component';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { IonMenu, IonSplitPane, IonTitle } from '@ionic/angular/standalone';
import { FilterMenuComponent } from 'src/app/modules/side-menu/components/filter-menu/filter-menu.component';

/**
 * Show a list of observation data that meets current search filter.
 * The page have two views/modes: 1) A list of observation cards, and 2) A grid of images from the observations.
 */
@Component({
  selector: 'app-list-page',
  template: `
    <ion-split-pane contentId="main-content-list-page">
      <ion-menu side="start" menuId="filter" contentId="main-content-list-page">
        <app-filter-menu></app-filter-menu>
      </ion-menu>

      <div id="main-content-list-page" class="ion-page">
        <app-header>
          <ion-title>{{ 'OBSERVATION_LIST.TITLE' | translate }}</ion-title>
        </app-header>
        <router-outlet></router-outlet>
        <app-add-menu></app-add-menu>
      </div>
    </ion-split-pane>
  `,
  styles: `
    ion-split-pane {
      --side-max-width: 300px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AddMenuComponent,
    FilterMenuComponent,
    HeaderComponent,
    IonMenu,
    IonSplitPane,
    IonTitle,
    RouterOutlet,
    TranslatePipe,
  ],
})
export class ObservationListPage {}
