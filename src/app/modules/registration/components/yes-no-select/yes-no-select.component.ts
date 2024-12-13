import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SelectOption } from '../../../shared/components/input/select/select-option.model';
import { IonicModule } from '@ionic/angular';
import { SelectComponent } from '../../../shared/components/input/select/select.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-yes-no-select',
  templateUrl: './yes-no-select.component.html',
  styleUrls: ['./yes-no-select.component.scss'],
  imports: [IonicModule, SelectComponent, TranslateModule],
})
export class YesNoSelectComponent {
  @Input() value: boolean;
  @Input() labelColor = 'medium';
  @Input() title: string;
  @Output() valueChange = new EventEmitter();

  options: SelectOption[] = [
    { id: true, text: 'DIALOGS.YES' },
    { id: false, text: 'DIALOGS.NO' },
  ];
}
