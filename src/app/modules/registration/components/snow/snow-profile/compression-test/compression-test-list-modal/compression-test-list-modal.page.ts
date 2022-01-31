import { Component, OnInit, Input, NgZone, OnDestroy } from '@angular/core';
import { CompressionTestEditModel } from 'src/app/modules/common-regobs-api/models';
import { ModalController } from '@ionic/angular';
import { RegistrationService } from '../../../../../services/registration.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import cloneDeep from 'clone-deep';
import { IRegistration } from 'src/app/modules/common-registration/registration.models';
import { RegistrationService as CommonRegistrationService } from 'src/app/modules/common-registration/registration.services';

@Component({
  selector: 'app-compression-test-list-modal',
  templateUrl: './compression-test-list-modal.page.html',
  styleUrls: ['./compression-test-list-modal.page.scss']
})
export class CompressionTestListModalPage implements OnInit, OnDestroy {
  @Input() regId: string;

  private ngDestroy$ = new Subject<void>();
  private initialRegistrationClone: IRegistration;
  reg: IRegistration;

  set tests(val: CompressionTestEditModel[]) {
    this.reg.request.CompressionTest = val;
  }

  constructor(
    private modalController: ModalController,
    private registrationService: RegistrationService,
    private commonRegistrationService: CommonRegistrationService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.commonRegistrationService
      .getRegistrationByIdShared$(this.regId)
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
    this.ngDestroy$.next();
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
