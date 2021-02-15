import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { legendsConfig } from '../legends.config';

@Component({
  selector: 'app-support-tile-legend-loader',
  templateUrl: './support-tile-legend-loader.component.html',
  styleUrls: ['./support-tile-legend-loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupportTileLegendLoaderComponent implements OnInit {
  @Input() name: string;
  @ViewChild('legend', { static: true, read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.loadComponent();
  }

  loadComponent(): void {
    if (this.name && legendsConfig[this.name]) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        legendsConfig[this.name]
      );
      this.viewContainerRef.createComponent(componentFactory);
    }
  }
}
