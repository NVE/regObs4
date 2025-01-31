import { Component, effect, inject, input, linkedSignal, untracked } from '@angular/core';
import { CompressionTestEditModel } from 'src/app/modules/common-regobs-api';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonRow,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import cloneDeep from 'clone-deep';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { HeaderColorDirective } from '../../../../../../shared/directives/header-color/header-color.directive';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CompressionTestListComponent } from '../../../compression-test-list/compression-test-list.component';
import { TranslatePipe } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-compression-test-list-modal',
  templateUrl: './compression-test-list-modal.page.html',
  styleUrls: ['./compression-test-list-modal.page.scss'],
  imports: [
    CompressionTestListComponent,
    FormsModule,
    HeaderColorDirective,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonRow,
    IonTitle,
    IonToolbar,
    NgIf,
    TranslatePipe,
  ],
})
export class CompressionTestListModalPage {
  private modalController = inject(ModalController);
  private draftService = inject(DraftRepositoryService);

  readonly uuid = input.required<string>();
  draft = toSignal(this.draftService.getDraft$(this.uuid()));

  tests = linkedSignal(() => this.draft()?.registration.CompressionTest || []);
  private initialRegistrationClone?: RegistrationDraft;

  constructor() {
    effect(() => {
      const draft = this.draft();
      if (draft != null && this.initialRegistrationClone == null) {
        this.initialRegistrationClone = cloneDeep(draft);
      }
    });

    effect(() => {
      const tests = this.tests();
      untracked(() => {
        this.save(tests);
      });
    });
  }

  async save(tests: CompressionTestEditModel[]) {
    const draft = this.draft();
    if (draft == null) {
      throw new Error('Draft not loaded');
    }

    const updatedDraft: RegistrationDraft = {
      ...draft,
      registration: {
        ...draft.registration,
        CompressionTest: tests,
      },
    };

    await this.draftService.save(updatedDraft);
  }

  ok() {
    this.modalController.dismiss();
  }

  async cancel() {
    if (this.initialRegistrationClone) {
      await this.draftService.save(this.initialRegistrationClone);
    }
    this.modalController.dismiss();
  }
}
