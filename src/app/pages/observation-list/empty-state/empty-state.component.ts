import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonGrid, IonRow, Platform } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-empty-state',
  imports: [IonGrid, IonRow, SvgIconComponent, TranslatePipe],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  private platform = inject(Platform);
  isMobile = this.platform.is('android') || this.platform.is('ios') || this.platform.is('mobileweb');
}
