import { Directive, ElementRef, Input, OnChanges, inject } from '@angular/core';
@Directive({ selector: '[appShadowCss]' })
export class ShadowCssDirective implements OnChanges {
  private el = inject(ElementRef);

  @Input() shadowCustomCss: string;

  ngOnChanges(): void {
    const shadow = this.el.nativeElement.shadowRoot || this.el.nativeElement.attachShadow({ mode: 'open' });
    if (shadow) {
      let innerHTML = '';
      innerHTML += '<style>';
      innerHTML += this.shadowCustomCss;
      innerHTML += '</style>';
      shadow.innerHTML += innerHTML;
    }
  }
}
