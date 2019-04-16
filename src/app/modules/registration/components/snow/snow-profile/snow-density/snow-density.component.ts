import { Component, OnInit, Input } from '@angular/core';
import { IsEmptyHelper } from '../../../../../../core/helpers/is-empty.helper';
import { DensityProfileDto } from '../../../../../regobs-api/models';

@Component({
  selector: 'app-snow-density',
  templateUrl: './snow-density.component.html',
  styleUrls: ['./snow-density.component.scss']
})
export class SnowDensityComponent implements OnInit {

  @Input() profiles: Array<DensityProfileDto>;

  get isEmpty() {
    return IsEmptyHelper.isEmpty(this.profiles);
  }

  constructor() { }

  ngOnInit() {
  }

  openModal() {

  }

}
