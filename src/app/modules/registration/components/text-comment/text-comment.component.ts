import { IonItem, IonTextarea, IonLabel } from '@ionic/angular/standalone';
import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-text-comment',
  templateUrl: './text-comment.component.html',
  styleUrls: ['./text-comment.component.scss'],
  imports: [FormsModule, IonItem, IonLabel, IonTextarea, TranslatePipe],
})
export class TextCommentComponent {
  readonly label = input<string>();
  readonly placeholder = input<string>('');
  readonly value = model<string>();
  readonly rows = input(4);
  readonly disabled = input(false);
  readonly max = input(1024);

  onBlur() {
    this.value.update((v) => (v ? v.trim() : v));
  }
}
