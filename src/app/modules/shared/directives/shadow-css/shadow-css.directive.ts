import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
@Directive({
  selector: '[appShadowCss]'
})
export class ShadowCssDirective implements OnChanges {
  @Input() shadowCustomCss: string;

  ngOnChanges(): void {
    const shadow =
      this.el.nativeElement.shadowRoot ||
      this.el.nativeElement.attachShadow({ mode: 'open' });
    if (shadow) {
      let innerHTML = '';
      innerHTML += '<style>';
      innerHTML += this.shadowCustomCss;
      innerHTML += '</style>';
      shadow.innerHTML += innerHTML;
    }
  }
  constructor(private el: ElementRef) {}
}
