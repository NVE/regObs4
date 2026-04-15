import { Component, CUSTOM_ELEMENTS_SCHEMA, input, model } from '@angular/core';
import 'nve-designsystem/components/nve-textarea/nve-textarea.component.js';
import 'nve-designsystem/components/nve-label/nve-label.component.js';
import { FormValueControl } from '@angular/forms/signals';

/**
 * <nve-textarea> wrapper
 *
 * implementerer deler av FormValueControl for å fjøre det enkelt å bruke signal forms.
 */
@Component({
  selector: 'app-nve-textarea',
  imports: [],
  template: `
    <nve-textarea
      rows="5"
      [value]="value()"
      [disabled]="disabled()"
      [readonly]="readonly()"
      [name]="name()"
      [required]="required()"
      [minlength]="minLength()"
      [maxlength]="maxLength()"
      (sl-change)="updateValue($event)"
    >
      <nve-label slot="label" [value]="label()" size="medium"></nve-label>
    </nve-textarea>
    @if (desc(); as textareaDesc) {
      <p>{{ textareaDesc }}</p>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-x-small, 8px);
    }
    p {
      font-size: var(--font-size-2x-small, 14px);
      margin: 0;
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NveTextareaComponent implements FormValueControl<string> {
  readonly label = input.required<string>();
  readonly value = model('');
  readonly desc = input<string>();
  readonly disabled = input(false);
  readonly readonly = input(false);
  readonly name = input('');
  readonly required = input(false);
  readonly minLength = input<number>();
  readonly maxLength = input<number>();

  updateValue(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    const value = target.value;
    this.value.set(value);
  }
}
