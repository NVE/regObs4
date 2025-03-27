import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from '../../modules/shared/components/header/header.component';
import { AddMenuComponent } from '../../modules/shared/components/add-menu/add-menu.component';
import { RouterOutlet } from '@angular/router';

/**
 * Show a list of observation data that meets current search filter.
 * The page have two views/modes: 1) A list of observation cards, and 2) A grid of images from the observations.
 */
@Component({
  selector: 'app-list-page',
  template: `
    <app-header>Observasjoner</app-header>
    <router-outlet></router-outlet>
    <app-add-menu></app-add-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AddMenuComponent, HeaderComponent, RouterOutlet],
})
export class ObservationListPage {}
