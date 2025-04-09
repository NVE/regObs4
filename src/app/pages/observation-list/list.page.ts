import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../modules/shared/components/header/header.component';
import { AddMenuComponent } from '../../modules/shared/components/add-menu/add-menu.component';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { IonButtons, IonIcon, IonMenu, IonMenuButton, IonSplitPane, IonTitle } from '@ionic/angular/standalone';
import { FilterMenuComponent } from 'src/app/modules/side-menu/components/filter-menu/filter-menu.component';

/**
 * Show a list of observation data that meets current search filter.
 * The page have two views/modes: 1) A list of observation cards, and 2) A grid of images from the observations.
 */
@Component({
  selector: 'app-list-page',
  template: `
    <ion-split-pane contentId="main-content-list-page">
      <ion-menu side="start" menuId="list-filter" contentId="main-content-list-page">
        @defer {
          <app-filter-menu></app-filter-menu>
        }
      </ion-menu>

      <div id="main-content-list-page" class="ion-page">
        <app-header>
          <!-- Høyremeny -->
          <ion-buttons slot="end">
            <ion-menu-button color="light"> </ion-menu-button>
          </ion-buttons>

          <!-- Venstremeny / filtermeny -->
          <ion-buttons slot="start">
            <ion-menu-button menu="list-filter" color="light">
              <ion-icon name="options-outline"></ion-icon>
            </ion-menu-button>
          </ion-buttons>

          <ion-title>{{ 'OBSERVATION_LIST.TITLE' | translate }}</ion-title>
        </app-header>
        <router-outlet></router-outlet>
        <app-add-menu></app-add-menu>
      </div>
    </ion-split-pane>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AddMenuComponent,
    FilterMenuComponent,
    HeaderComponent,
    IonButtons,
    IonIcon,
    IonMenu,
    IonMenuButton,
    IonSplitPane,
    IonTitle,
    RouterOutlet,
    TranslatePipe,
  ],
})
export class ObservationListPage {}
