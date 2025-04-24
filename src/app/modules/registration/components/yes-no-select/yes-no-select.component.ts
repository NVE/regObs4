import { Component, input, model } from '@angular/core';
import { SelectOption } from '../../../shared/components/input/select/select-option.model';
import { SelectComponent } from '../../../shared/components/input/select/select.component';

@Component({
  selector: 'app-yes-no-select',
  templateUrl: './yes-no-select.component.html',
  styleUrls: ['./yes-no-select.component.scss'],
  imports: [SelectComponent],
})
export class YesNoSelectComponent {
  readonly value = model<boolean>();
  readonly labelColor = input('medium');
  readonly title = input.required<string>();

  options: SelectOption[] = [
    { id: true, text: 'DIALOGS.YES' },
    { id: false, text: 'DIALOGS.NO' },
  ];
}
