import { Component, OnInit, Input } from '@angular/core';
import { PictureRequestDto } from '../../../regobs-api/models';
import { ISummaryItem } from './summary-item.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss']
})
export class SummaryItemComponent implements OnInit {

  @Input() item: ISummaryItem;
  @Input() readonly = false;

  constructor(private navController: NavController) { }

  async ngOnInit() {

  }

  navigate(event: CustomEvent) {
    if (!this.readonly) {
      this.navController.navigateForward([this.item.href, this.item.id], {
        queryParams: this.item.queryParams
      });
    }
  }
}
