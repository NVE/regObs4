import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { AttachmentViewModel } from 'src/app/modules/common-regobs-api';

/**
 * Viser attachments i grid på detaljside.
 * Ved klikk på attachment trigges en output som kan brukes til å åpne bildekarusell.
 */
@Component({
  selector: 'app-attachment-grid',
  template: `
    @if (attachments().length > 0) {
      <div class="grid">
        @if (attachments().length > 0) {
          @for (attachment of attachments(); track attachment.AttachmentId) {
            <div class="attachment" (click)="attachmentClicked.emit({ index: $index })">
              <img [src]="attachment.UrlFormats?.Medium" />
              @if (attachment.Comment) {
                <div class="comment">{{ attachment.Comment }}</div>
              }
            </div>
          }
        }
      </div>
    }
  `,
  styles: `
    :host {
      display: block;
    }
    .grid {
      display: grid;
      flex-wrap: wrap;
      gap: 24px;
      padding: 10px 0;
    }

    .attachment {
      max-width: 272px;
      cursor: pointer;
      background-color: #00000011;
    }

    img {
      width: 100%;
      max-height: 272px;
      object-fit: contain;
      background-color: transparent;
    }

    .comment {
      width: 100%;
      padding: 8px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttachmentGridComponent {
  attachments = input.required<AttachmentViewModel[]>();
  attachmentClicked = output<{ index: number }>();
}
