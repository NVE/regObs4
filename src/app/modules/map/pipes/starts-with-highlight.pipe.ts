import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'startsWithHighlight',
})
export class StartsWithHighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, args?: string): SafeHtml {
    const result = args ? value.replace(new RegExp('(' + args + ')', 'gi'), '<strong>$1</strong>') : value;
    return this.sanitizer.bypassSecurityTrustHtml(result);
  }
}
