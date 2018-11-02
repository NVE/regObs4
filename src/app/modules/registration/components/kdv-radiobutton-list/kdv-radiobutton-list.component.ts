import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
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
  ) { }

  async ngOnInit() {
    const userSetting = await this.userSettingService.getUserSettings();
    this.kdvelements = await this.kdvService.getKdvElements(userSetting.language, userSetting.appMode, this.kdvKey);
  }

  onChange() {
    this.valueChange.emit(this.value);
  }

}
