import { Component, OnInit, ChangeDetectionStrategy, Input, ViewContainerRef, inject } from '@angular/core';
import { legendsConfig } from '../legends.config';

@Component({
  selector: 'app-support-tile-legend-loader',
  templateUrl: './support-tile-legend-loader.component.html',
  styleUrls: ['./support-tile-legend-loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportTileLegendLoaderComponent implements OnInit {
  viewContainer = inject(ViewContainerRef);

  @Input() name: string;

  ngOnInit(): void {
    this.loadComponent();
  }

  loadComponent(): void {
    if (this.name && legendsConfig[this.name]) {
      const component = legendsConfig[this.name];
      this.viewContainer.createComponent(component);
    }
  }
}
