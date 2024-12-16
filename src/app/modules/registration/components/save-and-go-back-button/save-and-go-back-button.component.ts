import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IonButton, IonCol, IonGrid, IonRouterLink, IonRow, NavController } from '@ionic/angular/standalone';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { SvgIconComponent } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-save-and-go-back-button',
  templateUrl: './save-and-go-back-button.component.html',
  styleUrls: ['./save-and-go-back-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonButton, IonCol, IonGrid, IonRow, SvgIconComponent, TranslateModule, IonRouterLink],
})
export class SaveAndGoBackButtonComponent {
  @Input() draft: RegistrationDraft;
  @Output() reset = new EventEmitter();

  constructor(private navContoller: NavController) {}

  async goBack() {
    this.navContoller.navigateBack('registration/edit/' + this.draft.uuid);
  }

  doReset() {
    this.reset.emit();
  }
}
