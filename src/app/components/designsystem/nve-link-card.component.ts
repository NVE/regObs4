import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import 'nve-designsystem/components/nve-link-card/nve-link-card.component.js';

/**
 * <nve-link-card> wrapper.
 *
 * Se https://designsystem.nve.no/components/nve-link-card.html
 */
@Component({
  selector: 'app-nve-link-card',
  imports: [RouterLink],
  template: `
    <nve-link-card
      [routerLink]="href()"
      [label]="label()"
      [additionalText]="additionalText()"
      [variant]="variant()"
      [size]="size()"
      clickAction="internal"
    ></nve-link-card>
  `,
  styles: `
    :host {
      display: contents;
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NveLinkCardComponent {
  readonly label = input.required<string>();
  readonly href = input.required<string>();
  readonly additionalText = input<string>();
  readonly variant = input<'primary' | 'secondary' | 'contrast'>('primary');
  readonly size = input<'small' | 'medium' | 'large'>('medium');
}
