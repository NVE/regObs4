import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { AttachmentViewModel } from 'src/app/modules/common-regobs-api';

/**
 * Viser attachments i grid på detaljside.
 * Ved klikk på attachment trigges en output som kan brukes til å åpne bildekarusell.
 */
@Component({
  selector: 'app-attachment-grid',
  imports: [],
  template: `
    @for (attachment of attachments(); track attachment.AttachmentId) {
      <div class="attachment" (click)="attachmentClicked.emit({ index: $index })">
        <img [src]="attachment.UrlFormats?.Medium" />
        @if (attachment.Comment) {
          <div class="comment">{{ attachment.Comment }}</div>
        }
      </div>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      padding: 10px 0;
    }

    .attachment {
      width: 200px;
      cursor: pointer;
    }

    img {
      width: 100%;
      height: 200px;
      object-fit: contain;
      background-color: #00000011;
    }

    .comment {
      width: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttachmentGridComponent {
  attachments = input.required<AttachmentViewModel[]>();
  attachmentClicked = output<{ index: number }>();
}
