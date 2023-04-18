import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-text-comment',
  templateUrl: './text-comment.component.html',
  styleUrls: ['./text-comment.component.scss'],
})
export class TextCommentComponent {
  @Input() labelTitle: string;
  @Input() placeholder: string;
  @Input() value: string;
  @Output() valueChange = new EventEmitter();
  @Input() rows = 4;
  @Input() disabled = false;
  @Input() max = 1024;

  onBlur() {
    if (this.value) {
      this.value = this.value.trim();
    }
    this.valueChange.emit(this.value);
  }
}
