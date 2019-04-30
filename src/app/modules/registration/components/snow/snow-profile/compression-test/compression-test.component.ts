import { Component, OnInit, Input } from '@angular/core';
import { CompressionTestDto } from '../../../../../regobs-api/models';
import { IsEmptyHelper } from '../../../../../../core/helpers/is-empty.helper';

@Component({
  selector: 'app-compression-test',
  templateUrl: './compression-test.component.html',
  styleUrls: ['./compression-test.component.scss']
})
export class CompressionTestComponent implements OnInit {

  @Input() tests: Array<CompressionTestDto>;

  get isEmpty() {
    return IsEmptyHelper.isEmpty(this.tests);
  }

  constructor() { }

  ngOnInit() {
  }

  openModal() {

  }

}
