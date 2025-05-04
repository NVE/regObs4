import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { IonLabel, IonNote } from '@ionic/angular/standalone';

/** Accordion-tittel for lister med flervalg. Viser hva som er valgt */
@Component({
  selector: 'app-header-with-selected-items',
  templateUrl: './header-with-selected-items.component.html',
  styleUrls: ['./header-with-selected-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonNote, IonLabel, TranslatePipe],
})
export class HeaderWithSelectedItemsComponent {
  readonly titleKey = input<string>('');
  readonly items = input<string[]>([]);

  count = computed((): number => this.items().length);

  // viser valgte elementer som komma-separert liste
  itemsText = computed((): string => {
    if (this.items().length > 0) {
      return this.items().join(', ');
    }
    return '';
  });
}
