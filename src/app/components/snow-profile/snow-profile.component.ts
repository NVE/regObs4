import { ChangeDetectionStrategy, Component, computed, inject, input, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import { CompressionTestEditModel, SnowProfileEditModel } from 'src/app/modules/common-regobs-api';
import { HardnessScaleMode, LayerPolygon, PlotFrame } from './models';
import {
  createTempProjector,
  createTempPoints,
  pointsToPath,
  createTempAxis,
  createLayerPolygons,
  computeExpandedHeights,
  layerPolygonDataToPoints,
  expandLayerPolygons,
  createLayerLabels,
  pointsToPolyline,
  createHardnessWidthProjector,
  createHardnessAxis,
  createDepthProjector,
  createDepthAxis,
  createCompressionTestPlots,
} from './plot';
import { formatCompressionTest } from './compression-test';

@Component({
  selector: 'app-snow-profile',
  templateUrl: './snow-profile.component.html',
  styleUrls: ['./snow-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // imports: [JsonPipe],
})
export class SnowProfileComponent {
  private kdv = inject(KdvService);

  grainForm = toSignal(this.kdv.getKdvRepositoryByKeyObservable('Snow_GrainFormKDV'), { initialValue: [] });
  hardness = toSignal(this.kdv.getKdvRepositoryByKeyObservable('Snow_HardnessKDV'), { initialValue: [] });
  lwc = toSignal(this.kdv.getKdvRepositoryByKeyObservable('Snow_WetnessKDV'), { initialValue: [] });
  propagationKdv = toSignal(this.kdv.getKdvRepositoryByKeyObservable('Snow_PropagationKDV'), { initialValue: [] });
  fractureKdv = toSignal(this.kdv.getKdvRepositoryByKeyObservable('Snow_ComprTestFractureKDV'), { initialValue: [] });

  //   Snow_PropagationKDV
  // Snow_ComprTestFractureKDV

  data = input.required<SnowProfileEditModel>();
  tests = input<CompressionTestEditModel[]>();
  inputWidth = input(0, { alias: 'width' });
  inputHeight = input(0, { alias: 'height' });
  hardnessScaleMode = input<HardnessScaleMode>('linear');
  hardnessScaleExponent = input(2);
  minHardnessWidthPx = input(24);
  useRamResistance = input(false);
  showLabelAxis = input(true);

  width = computed(() => {
    if (this.inputWidth() > 0) {
      return this.inputWidth();
    }
    if (this.inputHeight()) {
      return (this.inputHeight() * 7) / 10;
    }
    return 0;
  });

  height = computed(() => {
    if (this.inputHeight() > 0) {
      return this.inputHeight();
    }
    if (this.inputWidth()) {
      return (this.inputWidth() * 10) / 7;
    }
    return 0;
  });

  scaleFactor = computed(() => {
    const width = this.width();
    let scaleFactor = 1;
    if (width < 400) {
      scaleFactor = 1.5;
    }

    if (this.showLabels()) {
      const height = this.height() - this.y0() - this.yMargin();
      const layerHeights = this.layers().reduce((sum) => sum + this.minLayerHeight, 0);
      if (layerHeights > height) {
        const fixFactor = layerHeights / height;
        scaleFactor = Math.max(fixFactor, scaleFactor);
      }
    }

    return scaleFactor;
  });

  svgWidth = computed(() => this.width() * this.scaleFactor());
  svgHeight = computed(() => this.height() * this.scaleFactor());
  viewBox = computed(() => `0 0 ${this.svgWidth()} ${this.svgHeight()}`);

  showAxis = computed(() => this.width() > 100 && this.height() > 200);
  showLabels = computed(() => this.width() > 200);

  minLayerHeight = 20;

  transitionEndOffset = 20;
  transitionWidth = 20;
  axisLabelOffset = 15;
  x0 = computed(() => (this.showAxis() ? 20 : 0));
  y0 = computed(() => (this.showAxis() ? 60 : 0));
  xMargin = computed(() => (this.showAxis() ? 70 : 0));
  availableWidth = computed(() => {
    const width = this.svgWidth();
    return width - this.x0() - this.xMargin();
  });
  yMargin = computed(() => {
    if (this.showAxis()) {
      if (this.showLabelAxis()) {
        return 60;
      }
      return 40;
    }
    return 0;
  });
  availableHeight = computed(() => this.svgHeight() - this.y0() - this.yMargin());
  frame: Signal<PlotFrame> = computed(() => ({
    width: this.availableWidth(),
    height: this.availableHeight(),
    x0: this.x0(),
    y0: this.y0(),
    axisSize: 10,
  }));

  temperatures = computed(() => this.data()?.SnowTemp?.Layers || []);
  tempMin = computed(() => {
    const minTemp = this.temperatures().reduce((min, x) => Math.min(min, x.SnowTemp || 0), 0);
    if (minTemp > -10) {
      return -10;
    }
    if (minTemp > -20) {
      return -20;
    }
    if (minTemp > -30) {
      return -30;
    }
    return -40;
  });
  tempMax = 0;
  tempDepth = computed(() => this.temperatures().reduce((max, x) => Math.max(max, x.Depth || 0), 0));
  tempProjector = computed(() => createTempProjector(this.frame(), this.tempMin(), this.maxDepth()));
  tempPoints = computed(() => createTempPoints(this.temperatures(), this.tempProjector()));
  tempPath = computed(() => pointsToPath(this.tempPoints()));
  tempAxis = computed(() => createTempAxis(this.frame(), this.tempMin(), this.tempProjector()));

  layers = computed(() => this.data()?.StratProfile?.Layers || []);
  layerDepth = computed(() => this.layers().reduce((depth, x) => depth + (x.Thickness || 0), 0));
  rawLayerPolygons = computed(() =>
    createLayerPolygons(this.frame(), this.layers(), this.maxDepth(), this.hardnessProjector(), this.depthProjector())
  );
  layerHeights = computed(() => this.rawLayerPolygons().map((l) => l.originalHeight));
  layerHeightsExpanded = computed(() => computeExpandedHeights(this.layerHeights(), this.minLayerHeight));
  layerPolylinePoints: Signal<LayerPolygon[]> = computed(() => {
    const raw = this.rawLayerPolygons();
    const minH = this.minLayerHeight;
    if (minH <= 0 || !this.showLabels()) {
      return raw.map((x) => ({
        points: layerPolygonDataToPoints(x),
        tooltip: x.tooltip,
      }));
    }
    return expandLayerPolygons(raw, this.layerHeightsExpanded(), {
      minHeight: minH,
      transitionEndOffsetFromRight: this.transitionEndOffset,
      transitionWidth: this.transitionWidth,
    });
  });

  // Labels
  layerLabels = computed(() => createLayerLabels(this.frame(), this.layers(), this.layerPolylinePoints()));
  grainFormLabels = computed(() => this.layerLabels().gf);
  grainSizeLabels = computed(() => this.layerLabels().gs);
  lwcLabels = computed(() => {
    return this.layerLabels().lwc.map(({ value, y }) => {
      const name = this.lwc().find((x) => x.Id === value)?.Name ?? value.toString();
      return {
        value: name,
        y,
      };
    });
  });

  layerPolylines = computed(() =>
    this.layerPolylinePoints().map((l) => ({ points: pointsToPolyline(l.points), tooltip: l.tooltip }))
  );

  toGround = computed(() => !!this.data()?.IsProfileToGround);
  groundSymbolY = computed(() => {
    return this.rawLayerPolygons().at(-1)?.bottomY as number;
  });

  hardnessProjector = computed(() =>
    createHardnessWidthProjector(this.frame(), {
      mode: this.hardnessScaleMode(),
      minWidthPx: this.minHardnessWidthPx(),
      exponent: this.hardnessScaleExponent(),
    })
  );
  hardnessAxis = computed(() => createHardnessAxis(this.frame(), this.hardnessProjector()));

  maxDepth = computed(() => Math.max(this.tempDepth(), this.layerDepth()));
  depthProjector = computed(() => createDepthProjector(this.frame(), this.maxDepth()));
  depthAxis = computed(() => createDepthAxis(this.frame(), this.maxDepth(), this.depthProjector()));

  testFormatter = computed(() => {
    const propagationKdv = this.propagationKdv();
    const fractureKdv = this.fractureKdv();
    return (test: CompressionTestEditModel) => {
      return formatCompressionTest(test, propagationKdv, fractureKdv, { includeDepth: false });
    };
  });
  testPlots = computed(() => {
    const tests = this.tests();
    if (tests) {
      return createCompressionTestPlots(tests, this.testFormatter(), this.depthProjector());
    }
    return [];
  });
}
