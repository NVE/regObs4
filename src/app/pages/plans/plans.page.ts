import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { IonButtons, IonMenuButton, IonTitle } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { HeaderComponent } from 'src/app/modules/shared/components/header/header.component';
import 'nve-designsystem/components/nve-button/nve-button.component.js';
import 'nve-designsystem/components/nve-icon/nve-icon.component.js';
import 'nve-designsystem/components/nve-message-card/nve-message-card.component.js';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrl: './plans.page.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent, IonButtons, IonMenuButton, IonTitle, TranslatePipe, TranslatePipe],
})
/** Side som viser planer og sporfiler */
export class PlansPage {
  showImportmessage = signal<boolean>(false);

  importGpxFiles = () => {
    //TODO: Velg og importer GPX-filer
    this.showImportmessage.set(true);
    setTimeout(() => {
      this.showImportmessage.set(false);
    }, 3000);
  };
}
