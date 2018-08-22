import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss']
})
export class AddMenuComponent implements OnInit {

  isVisible = false;

  constructor() { }

  show() {
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }

  ngOnInit() {
  }

}
