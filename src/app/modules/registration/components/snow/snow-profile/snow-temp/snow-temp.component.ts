import { Component, OnInit, Input } from '@angular/core';
import { TempObsDto } from '../../../../../regobs-api/models';
import { IsEmptyHelper } from '../../../../../../core/helpers/is-empty.helper';

@Component({
  selector: 'app-snow-temp',
  templateUrl: './snow-temp.component.html',
  styleUrls: ['./snow-temp.component.scss']
})
export class SnowTempComponent implements OnInit {

  @Input() profile: TempObsDto;

  get isEmpty() {
    return IsEmptyHelper.isEmpty(this.profile);
  }

  constructor() { }

  ngOnInit() {
  }

  openModal() {

  }

}
