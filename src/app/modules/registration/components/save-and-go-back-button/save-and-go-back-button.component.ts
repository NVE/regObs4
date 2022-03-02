import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { SmartChanges } from 'src/app/core/helpers/simple-changes.helper';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';

@Component({
  selector: 'app-save-and-go-back-button',
  templateUrl: './save-and-go-back-button.component.html',
  styleUrls: ['./save-and-go-back-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SaveAndGoBackButtonComponent implements OnInit, OnChanges {
  @Input() draft: RegistrationDraft;
  @Input() registrationTid: RegistrationTid;
  @Output() reset = new EventEmitter();

  hasData = false;

  constructor(
    private navContoller: NavController,
    private draftService: DraftRepositoryService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnChanges(changes: SimpleChanges & SmartChanges<this>): void {
    if(changes && changes.registration && !changes.registration.isFirstChange()) {
      this.setHasData();
    }
  }

  ngOnInit() {
    this.setHasData();
  }

  private async setHasData(): Promise<void> {
    if (this.draft != null && this.registrationTid != null) {
      await this.draftService.isDraftEmptyForRegistrationType(this.draft, this.registrationTid);
      this.cdr.markForCheck();
    }
  }

  async goBack() {
    this.navContoller.navigateBack('registration/edit/' + this.draft.uuid);
  }

  doReset() {
    this.reset.emit();
  }
}
