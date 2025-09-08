import { ChangeDetectionStrategy, Component, HostBinding, input, output } from '@angular/core';
import { AttachmentViewModel } from 'src/app/modules/common-regobs-api';

/**
 * Viser attachments i grid på detaljside.
 * Ved klikk på attachment trigges en output som kan brukes til å åpne bildekarusell.
 */
@Component({
  selector: 'app-attachment-grid',
  template: `
    @for (attachment of attachments(); track attachment.AttachmentId) {
      <div class="attachment" (click)="attachmentClicked.emit({ index: $index })">
        <img [src]="attachment.UrlFormats?.Medium" [alt]="alt(attachment)" />
        @if (attachment.Comment) {
          <div class="comment">{{ attachment.Comment }}</div>
        }
      </div>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 24px;
    }
    :host(.hidden) {
      display: none;
    }

    .attachment {
      max-width: 272px;
      min-width: 272px;
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

  @HostBinding('class.hidden')
  get isHidden() {
    return this.attachments()?.length === 0;
  }

  /**
   * Returnerer kommentar som bildebeskrivelse eller en tom string hvis det ikke finnes kommentar.
   * Skjermlesere vil hoppe over bilder med tom kommentar.
   * Et alternativ er kanskje å legge til oversettelser som kan gi oss feks "Bilde av snødekke" som alt, men
   * har det noe verdi for brukerene?
   */
  alt(attachment: AttachmentViewModel): string {
    return attachment.Comment || '';
  }
}
