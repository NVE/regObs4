import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { WarningGroup } from '../../core/services/warning/warning-group.model';
import { WarningService } from '../../core/services/warning/warning.service';

@Component({
  selector: 'app-cap-list-group',
  templateUrl: './cap-list-group.component.html',
  styleUrls: ['./cap-list-group.component.scss']
})
export class CapListGroupComponent implements OnInit {

  @Input() title: string;
  @Input() warnings: WarningGroup[];

  constructor(public warningService: WarningService) {
  }

  ngOnInit() {
  }

  trackWarningGroup(index: number, group: WarningGroup) {
    return group ? group.group.groupId : undefined;
  }


  getDayWarning(group: WarningGroup, daysToAdd: number) {
    const day = moment().startOf('day').add(daysToAdd, 'days');
    const warning = group.getWarningForDay(day.toDate());
    if (warning) {
      return warning.warningLevel;
    }
    return 0;
  }

  getDayName(daysToAdd: number) {
    return `DAYS.SHORT.${moment().add(daysToAdd, 'days').day()}`;
  }

  toggleFavourite(group: WarningGroup) {
    console.log('Add item to favourites');
    group.isFavourite = true;
  }

  itemSwiped(group: WarningGroup) {
    console.log('Add item to favourites');
    group.isFavourite = true;
    // TODO: maybe add animation?
    // http://masteringionic.com/blog/2017-11-21-implementing-css3-animations-within-an-ionic-framework-project/
    // https://github.com/daneden/animate.css
  }

}
