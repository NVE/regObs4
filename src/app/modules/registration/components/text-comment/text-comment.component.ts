import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef, NgZone } from '@angular/core';
import { Textarea } from '@ionic/angular';

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
  minrows: number;

  get valToBind() {
    return this.value ? this.value : '';
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

  autoresize(event: Event) {
    const target: Textarea = <any>(event.target);
    const width = window.innerWidth;
    const charWidth = 10;
    const breaklines = target.value ? (target.value.split(/\r?\n|\r/)).length : 0;
    const textlines = (target.value ? target.value.length : 0) / (width / charWidth);
    const rows = Math.ceil(textlines) + breaklines;
    if (rows > this.minrows) {
      target.rows = rows;
    } else {
      target.rows = this.minrows;
    }
  }

}
