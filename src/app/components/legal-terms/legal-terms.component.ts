import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-legal-terms',
  templateUrl: './legal-terms.component.html',
  styleUrls: ['./legal-terms.component.scss'],
  imports: [IonCol, IonGrid, IonRow, TranslateModule],
})
export class LegalTermsComponent {}
