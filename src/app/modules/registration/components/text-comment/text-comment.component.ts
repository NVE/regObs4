import { Component, OnInit, Input, EventEmitter, Output, NgZone } from '@angular/core';

@Component({
  selector: 'app-text-comment',
  templateUrl: './text-comment.component.html',
  styleUrls: ['./text-comment.component.scss']
})
export class TextCommentComponent implements OnInit {

  @Input() title: string;
  @Input() placeholder: string;
  @Input() value: string;
  @Output() valueChange = new EventEmitter();
  @Input() rows: number;
  @Input() disabled = false;
  @Input() max = 1024;
  minrows: number;

  get valToBind() {
    return this.value ? this.value : '';
  }

  get isValid() {
    return !this.value || (this.value.length <= this.max);
  }

  set valToBind(val: string) {
    this.ngZone.run(() => {
      this.value = val;
      this.valueChange.emit(this.value);
    });
  }

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    if (!this.rows) {
      this.rows = 4;
    }
    this.minrows = this.rows;
  }

  onBlur() {
    if (this.value) {
      this.value = this.value.trim();
      this.valueChange.emit(this.value);
    }
  }

}
