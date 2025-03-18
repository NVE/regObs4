import { IonSpinner } from '@ionic/angular/standalone';
import { Component, ChangeDetectionStrategy, input, inject, computed, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/** Viser en figur for istykkelse */
@Component({
  selector: 'app-ice-plot',
  imports: [IonSpinner],
  template: `
    @if (loading()) {
      <ion-spinner></ion-spinner>
    }
    <iframe
      [hidden]="loading()"
      title="Ice Plot"
      [attr.src]="safeUrl()"
      (load)="onLoad()"
      (error)="onLoad()"
      importance="low"
      allowfullscreen="false"
    ></iframe>
  `,
  styles: [
    `
      iframe {
        height: 280px;
        width: 140px;
        border: none;
        margin-right: 32px;
        margin-top: -10px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IcePlotComponent {
  readonly url = input.required<string>();
  private sanitizer = inject(DomSanitizer);
  loading = signal(true);

  safeUrl = computed(() => {
    const result = this.sanitizer.bypassSecurityTrustResourceUrl(this.url());
    return result as string;
  });

  onLoad(): void {
    this.loading.set(false);
  }
}
