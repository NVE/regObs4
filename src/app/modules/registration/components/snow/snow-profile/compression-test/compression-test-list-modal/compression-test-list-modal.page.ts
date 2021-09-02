import { Component, OnInit, Input, NgZone, OnDestroy } from '@angular/core';
import { CompressionTestDto } from '../../../../../../regobs-api/models';
import { ModalController } from '@ionic/angular';
import { RegistrationService } from '../../../../../services/registration.service';
import { Subject } from 'rxjs';
import { IRegistration } from '../../../../../models/registration.model';
import { takeUntil } from 'rxjs/operators';
import cloneDeep from 'clone-deep';

@Component({
  selector: 'app-compression-test-list-modal',
  templateUrl: './compression-test-list-modal.page.html',
  styleUrls: ['./compression-test-list-modal.page.scss']
})
export class CompressionTestListModalPage implements OnInit, OnDestroy {
  @Input() regId: string;

  private ngDestroy$ = new Subject<boolean>();
  private initialRegistrationClone: IRegistration;
  reg: IRegistration;

  set tests(val: CompressionTestDto[]) {
    this.reg.request.CompressionTest = val;
  }

  constructor(
    private modalController: ModalController,
    private registrationService: RegistrationService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.registrationService
      .getSavedRegistrationByIdObservable(this.regId)
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((reg) => {
        this.ngZone.run(async () => {
          if (!this.initialRegistrationClone) {
            this.initialRegistrationClone = cloneDeep(reg);
          }
          this.reg = reg;
          if (!this.reg.request.CompressionTest) {
            this.reg.request.CompressionTest = [];
          }
        });
      });
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next(true);
    this.ngDestroy$.complete();
  }

  async save() {
    await this.registrationService.saveRegistrationAsync(this.reg);
  }

  ok() {
    this.modalController.dismiss();
  }

  async cancel() {
    await this.registrationService.saveRegistrationAsync(
      this.initialRegistrationClone
    );
    this.modalController.dismiss();
  }
}
