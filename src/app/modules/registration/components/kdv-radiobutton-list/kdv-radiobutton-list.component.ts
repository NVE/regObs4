import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, NgZone } from '@angular/core';
import { KdvService } from '../../../../core/services/kdv/kdv.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { KdvElement } from '../../../regobs-api/models';
import { RadioGroup } from '@ionic/angular';

@Component({
  selector: 'app-kdv-radiobutton-list',
  templateUrl: './kdv-radiobutton-list.component.html',
  styleUrls: ['./kdv-radiobutton-list.component.scss']
})
export class KdvRadiobuttonListComponent implements OnInit {

  @Input() title: string;
  @Input() kdvKey: string;
  @Input() value: number;
  @Input() useDescription: boolean;
  @Input() hideZeroValues: boolean;
  @Output() valueChange = new EventEmitter();

  kdvelements: KdvElement[];

  constructor(
    private kdvService: KdvService,
    private userSettingService: UserSettingService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
  ) { }

  async ngOnInit() {
    const userSetting = await this.userSettingService.getUserSettings();
    this.kdvelements = await this.kdvService.getKdvRepositories(userSetting.language, userSetting.appMode, this.kdvKey);
  }

  onChange() {
    this.ngZone.run(() => {
      this.valueChange.emit(this.value);
    });
  }

  setSelected(value: number) {
    this.ngZone.run(() => {
      this.value = value;
      this.valueChange.emit(this.value);
    });
  }

  isVisible(item: KdvElement) {
    if (!this.hideZeroValues) {
      return true;
    } else {
      return item.Id % 100 !== 0;
    }
  }

}
