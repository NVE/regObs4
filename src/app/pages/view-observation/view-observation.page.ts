import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-observation',
  templateUrl: './view-observation.page.html',
  styleUrls: ['./view-observation.page.scss'],
})
export class ViewObservationPage implements OnInit {

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log('show reg id: ', this.activatedRoute.snapshot.params['id']);
  }

}
