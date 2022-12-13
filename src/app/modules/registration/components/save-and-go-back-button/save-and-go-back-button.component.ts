import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';

@Component({
  selector: 'app-save-and-go-back-button',
  templateUrl: './save-and-go-back-button.component.html',
  styleUrls: ['./save-and-go-back-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
