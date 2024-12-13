import { Component, OnInit, Input, NgZone, OnDestroy } from '@angular/core';
import { CompressionTestEditModel } from 'src/app/modules/common-regobs-api/models';
import { ModalController, IonicModule } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import cloneDeep from 'clone-deep';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { HeaderColorDirective } from '../../../../../../shared/directives/header-color/header-color.directive';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CompressionTestListComponent } from '../../../compression-test-list/compression-test-list.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-compression-test-list-modal',
  templateUrl: './compression-test-list-modal.page.html',
  styleUrls: ['./compression-test-list-modal.page.scss'],
  imports: [IonicModule, HeaderColorDirective, FormsModule, NgIf, CompressionTestListComponent, TranslateModule],
})
export class CompressionTestListModalPage implements OnInit, OnDestroy {
  @Input() uuid: string;

  private ngDestroy$ = new Subject<void>();
  private initialRegistrationClone: RegistrationDraft;
  draft: RegistrationDraft;

  set tests(tests: CompressionTestEditModel[]) {
    this.draft.registration.CompressionTest = tests;
  }

  constructor(
    private modalController: ModalController,
    private draftService: DraftRepositoryService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.draftService
      .getDraft$(this.uuid)
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((reg) => {
        this.ngZone.run(async () => {
          if (!this.initialRegistrationClone) {
            this.initialRegistrationClone = cloneDeep(reg);
          }
          this.draft = reg;
          if (!this.draft.registration.CompressionTest) {
            this.draft.registration.CompressionTest = [];
          }
        });
      });
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  async save() {
    await this.draftService.save(this.draft);
  }

  ok() {
    this.modalController.dismiss();
  }

  async cancel() {
    await this.draftService.save(this.initialRegistrationClone);
    this.modalController.dismiss();
  }
}
