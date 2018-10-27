import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-buttons',
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.scss']
})
export class NavigationButtonsComponent implements OnInit {

  @Input() nextUrl: string;
  @Input() nextText: string;
  @Input() previousUrl: string;
  @Input() previousText: string;

  constructor() { }

  ngOnInit() {
  }

}
