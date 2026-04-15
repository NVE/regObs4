import {
  afterRenderEffect,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  input,
  model,
  untracked,
  viewChild,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import 'nve-designsystem/components/nve-select/nve-select.component.js';
import 'nve-designsystem/components/nve-option/nve-option.component.js';
import NveSelect from 'nve-designsystem/components/nve-select/nve-select.component.js';

interface NveSelectOption {
  value: string;
  label: string;
}

/**
 * <nve-select> wrapper
 *
 * implementerer deler av FormValueControl for å fjøre det enkelt å bruke signal forms.
 */
@Component({
  selector: 'app-nve-select',
  imports: [],
  template: `
    <nve-select
      #ref
      [label]="label()"
      [value]="value()"
      [required]="required()"
      [clearable]="clearable()"
      [disabled]="disabled()"
      (sl-change)="onSlChange($event)"
    >
      @for (option of options(); track option.value) {
        <nve-option [value]="option.value">{{ option.label }}</nve-option>
      }
    </nve-select>
  `,
  styles: `
    :host {
      display: contents;
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NveSelectComponent implements FormValueControl<string> {
  readonly label = input.required<string>();
  readonly options = input.required<NveSelectOption[]>();
  readonly value = model('');
  readonly disabled = input(false);
  readonly required = input(false);
  readonly clearable = input(true);

  private readonly selectElement = viewChild.required<ElementRef<NveSelect>>('ref');

  constructor() {
    // Virker som at designsystemet ikke henger med helt når options legges til etter at komponenten først er
    // rendret. Sett derfor value på selecten etter at options er oppdatert for å få reflektert valgt verdi.
    // Kan være vi kunne fjerna [value]="value()" fra templaten enn så lenge, men virker som at det ikke gjør noe
    // at det står dobbelt.
    afterRenderEffect(() => {
      this.options(); // Når options endres, oppdater valgt verdi.
      untracked(() => {
        this.selectElement().nativeElement.value = this.value();
      });
    });
  }

  focus(): void {
    this.selectElement().nativeElement.focus();
  }

  protected onSlChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.value.set(target.value);
  }
}
