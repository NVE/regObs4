import { Component, OnInit, ChangeDetectionStrategy, ViewContainerRef, inject, input } from '@angular/core';
import { legendsConfig } from '../legends.config';

@Component({
  selector: 'app-support-tile-legend-loader',
  templateUrl: './support-tile-legend-loader.component.html',
  styleUrls: ['./support-tile-legend-loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportTileLegendLoaderComponent implements OnInit {
  viewContainer = inject(ViewContainerRef);

  readonly name = input.required<string>();

  ngOnInit(): void {
    this.loadComponent();
  }

  loadComponent(): void {
    const name = this.name();
    if (name && legendsConfig[name]) {
      const component = legendsConfig[name];
      this.viewContainer.createComponent(component);
    }
  }
}
