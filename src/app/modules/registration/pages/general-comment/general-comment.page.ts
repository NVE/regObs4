import { Component, OnInit, Inject } from '@angular/core';
import { Textarea } from '@ionic/angular';

@Component({
  selector: 'app-general-comment',
  templateUrl: './general-comment.page.html',
  styleUrls: ['./general-comment.page.scss'],
})
export class GeneralCommentPage implements OnInit {
  minrows: number;
  constructor() { }

  ngOnInit() {
  }

  save() {

  }

  autoresize(event: Event) {
    const target: Textarea = <any>(event.target);
    if (!this.minrows) {
      this.minrows = target.rows;
    }
    const width = window.innerWidth;
    const charWidth = 10;
    const breaklines = (target.value.split(/\r?\n|\r/)).length;
    const textlines = target.value.length / (width / charWidth);
    const rows = Math.ceil(textlines) + breaklines;
    if (rows > this.minrows) {
      target.rows = rows;
    } else {
      target.rows = this.minrows;
    }
    // TODO: Move to shared component?
  }

}
