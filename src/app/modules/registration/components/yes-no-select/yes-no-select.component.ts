import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectInterface } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-yes-no-select',
  templateUrl: './yes-no-select.component.html',
  styleUrls: ['./yes-no-select.component.scss']
})
export class YesNoSelectComponent implements OnInit {

  @Input() value: boolean;
  @Input() interface: SelectInterface = 'action-sheet';
  @Input() labelColor = 'medium';
  @Input() title: string;
  @Input() placeholder: string;
  @Output() valueChange = new EventEmitter();
  @Input() showEmpty = true;

  interfaceOptions: any;
  options: Array<{ text: string, value: boolean }>;

  constructor(private translateService: TranslateService) { }

  async ngOnInit() {
    const translations = await this.translateService.get([
      this.title || '',
      this.placeholder || '',
      'DIALOGS.YES',
      'DIALOGS.NO']).toPromise();
    this.interfaceOptions = {
    };
    if (translations[this.title]) {
      this.interfaceOptions.header = translations[this.title];
    }
    if (translations[this.placeholder]) {
      this.interfaceOptions.subHeader = translations[this.placeholder];
    }

    const options = [
      { text: translations['DIALOGS.YES'], value: true },
      { text: translations['DIALOGS.NO'], value: false },
    ];
    if (this.showEmpty) {
      options.push({ text: '', value: undefined });
    }
    this.options = options;
  }
}
