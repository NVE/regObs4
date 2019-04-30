import { Component, OnInit, Input } from '@angular/core';
import { CompressionTestDto } from '../../../../../../regobs-api/models';

@Component({
  selector: 'app-compression-test-modal',
  templateUrl: './compression-test-modal.page.html',
  styleUrls: ['./compression-test-modal.page.scss'],
})
export class CompressionTestModalPage implements OnInit {

  @Input() tests: Array<CompressionTestDto>;

  useCylinder = true;

  get hasLayers() {
    return this.tests && this.tests.length > 0;
  }

  constructor() { }

  ngOnInit() {
  }

}
