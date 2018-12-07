import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  NgZone
} from '@angular/core';
import { KdvElement } from '../../../regobs-api/models';
import { KdvService } from '../../../../core/services/kdv/kdv.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { SelectInterface } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';
import { Select } from '@ionic/angular';

@Component({
  selector: 'app-kdv-dropdown',
  templateUrl: './kdv-dropdown.component.html',
  styleUrls: ['./kdv-dropdown.component.scss'],
})
export class KdvDropdownComponent implements OnInit {

  @Input() title: string;
  @Input() placeholder: string;
  @Input() kdvKey: string;
  @Input() value: number;
  @Input() interface: SelectInterface = 'action-sheet';
  @Input() interfaceOptions;
  @Input() useDescription: boolean;
  @Output() valueChange = new EventEmitter();
  @Input() hideZeroValues: boolean;

  kdvelements: KdvElement[];

  get selectedText() {
    if ((this.value !== undefined || this.value !== null) && this.kdvelements) {
      const kdvElement = this.kdvelements.find((x) => x.Id === this.value);
      if (kdvElement) {
        return this.useDescription ? kdvElement.Description : kdvElement.Name;
      }
    }
    return '';
  }

  @ViewChild(Select) select: Select;
  constructor(
    private kdvService: KdvService,
    private userSettingService: UserSettingService,
    private translateService: TranslateService,
  ) { }

  async ngOnInit() {
    const userSetting = await this.userSettingService.getUserSettings();
    this.kdvelements = await this.kdvService.getKdvRepositories(userSetting.language, userSetting.appMode, this.kdvKey);
    const translations = await this.translateService.get([this.title || '', this.placeholder || '']).toPromise();
    if (!this.interfaceOptions) {
      this.interfaceOptions = {};
      if (translations[this.title]) {
        this.interfaceOptions.header = translations[this.title];
      }
      if (translations[this.placeholder]) {
        this.interfaceOptions.subHeader = translations[this.placeholder];
      }
    }
  }

  isVisible(item: KdvElement) {
    if (!this.hideZeroValues) {
      return true;
    } else {
      return item.Id % 100 !== 0;
    }
  }

}
