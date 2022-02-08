import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IRegistration, RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { RegistrationService as CommonRegistrationService } from 'src/app/modules/common-registration/registration.services';
import { SmartChanges } from 'src/app/core/helpers/simple-changes.helper';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-save-and-go-back-button',
  templateUrl: './save-and-go-back-button.component.html',
  styleUrls: ['./save-and-go-back-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SaveAndGoBackButtonComponent implements OnInit, OnChanges {
  @Input() registration: IRegistration;
  @Input() registrationTid: RegistrationTid;
  @Output() reset = new EventEmitter();

  hasData = false;

  constructor(
    private navContoller: NavController,
    private commonRegistrationService: CommonRegistrationService,
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

  private setHasData(): void {
    if(this.registration != null && this.registrationTid != null) {
      this.commonRegistrationService.hasAnyDataToShowInRegistrationTypes(this.registration, this.registrationTid)
        .pipe((take(1))).subscribe((hasData) => {
          this.hasData = hasData;
          this.cdr.markForCheck();
        });
    }
  }

  async goBack() {
    this.navContoller.navigateBack('registration/edit/' + this.registration.id);
  }

  doReset() {
    this.reset.emit();
  }
}
