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
      loading="lazy"
      title="Ice Plot"
      [attr.src]="safeUrl()"
      (load)="onLoad()"
      (error)="onError()"
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
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IcePlotComponent {
  readonly url = input.required<string>();
  private sanitizer = inject(DomSanitizer);
  failed = signal(false);
  loadCalledCount = signal(0);
  loading = computed(() => this.loadCalledCount() < 2 && !this.failed());

  safeUrl = computed(() => {
    const result = this.sanitizer.bypassSecurityTrustResourceUrl(this.url());
    return result as string;
  });

  onLoad() {
    this.loadCalledCount.set(this.loadCalledCount() + 1);
  }
  onError() {
    this.failed.set(true);
  }
}
