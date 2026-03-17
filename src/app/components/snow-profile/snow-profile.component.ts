import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  Injector,
  input,
  output,
  signal,
  Signal,
  viewChildren,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import {
  CompressionTestEditModel,
  SnowProfileEditModel,
  StratProfileLayerEditModel,
} from 'src/app/modules/common-regobs-api';
import { CriticalLayer, Hardness, PlotFrame } from './models';
import {
  createTempProjector,
  createTempPoints,
  pointsToPath,
  createTempAxis,
  createLayerPolygons,
  computeExpandedHeights,
  expandLayerPolygons,
  createLayerLabels,
  pointsToPolyline,
  createHardnessWidthProjector,
  createHardnessAxis,
  createDepthProjector,
  createDepthAxis,
  createCompressionTestPlots,
  createCriticalLayers,
} from './plot';
import { formatCompressionTest } from './compression-test';
import { Platform } from '@ionic/angular';
import { createSnowProfileLayerFormatter } from './formatters';
import { TranslateService } from '@ngx-translate/core';

const PLOT_MAX_WIDTH = 700;

@Component({
  selector: 'app-snow-profile',
  templateUrl: './snow-profile.component.html',
  styleUrls: ['./snow-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnowProfileComponent {
  private kdv = inject(KdvService);
  private elementRef = inject(ElementRef);
  private destroyRef = inject(DestroyRef);
  private platform = inject(Platform);
  private injector = inject(Injector);
  private translate = inject(TranslateService);

  // grainForm = toSignal(this.kdv.getKdvRepositoryByKeyObservable('Snow_GrainFormKDV'), { initialValue: [] });
  // hardness = toSignal(this.kdv.getKdvRepositoryByKeyObservable('Snow_HardnessKDV'), { initialValue: [] });
  private lwcKdv = toSignal(this.kdv.getKdvRepositoryByKeyObservable('Snow_WetnessKDV'), { initialValue: [] });
  private propagationKdv = toSignal(this.kdv.getKdvRepositoryByKeyObservable('Snow_PropagationKDV'), {
    initialValue: [],
  });
  private fractureKdv = toSignal(this.kdv.getKdvRepositoryByKeyObservable('Snow_ComprTestFractureKDV'), {
    initialValue: [],
  });

  data = input.required<SnowProfileEditModel>();
  tests = input<CompressionTestEditModel[]>();
  useRamResistance = input(false);
  showLabelAxis = input(false);
  showPopovers = input(false);

  layerClick = output<{ i: number; layer: StratProfileLayerEditModel }>();

  showTooltips = !this.platform.is('mobile');

  width = signal(0);
  height = signal(0);

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

  showComments = computed(() => this.width() > 700);
  svgWidth = computed(() => {
    let width = this.width();
    if (this.showComments()) {
      width = Math.min(width * 0.7, PLOT_MAX_WIDTH);
    }
    return width * this.scaleFactor();
  });
  svgHeight = computed(() => this.height() * this.scaleFactor());
  viewBox = computed(() => `0 0 ${this.svgWidth()} ${this.svgHeight()}`);

  showAxis = computed(() => this.width() > 100 && this.height() > 200);
  showLabels = computed(() => this.width() > 200);

  minLayerHeight = 20;

  transitionEndOffset = 20;
  transitionWidth = 20;
  axisLabelOffset = 15;
  x0 = computed(() => (this.showAxis() ? 20 : 0));
  y0 = computed(() => (this.showTemp() ? 60 : 16));
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
  showTemp = computed(() => this.showAxis() && this.temperatures().length > 1);
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
  simplePolygons = computed(() =>
    createLayerPolygons(this.frame(), this.layers(), this.hardnessProjector(), this.depthProjector())
  );
  layerTooltips = computed(() => {
    const formatter = this.layerFormatter();
    return this.layers().map((l) => formatter.tooltip(l));
  });
  layerHeights = computed(() => this.simplePolygons().map((l) => l.bottomRight.y - l.topRight.y));
  layerHeightsExpanded = computed(() => computeExpandedHeights(this.layerHeights(), this.minLayerHeight));
  expandedPolygons = computed(() =>
    expandLayerPolygons(this.simplePolygons(), this.layerHeightsExpanded(), {
      minHeight: this.minLayerHeight,
      transitionEndOffsetFromRight: this.transitionEndOffset,
      transitionWidth: this.transitionWidth,
    })
  );

  criticalLayers = computed(() => createCriticalLayers(this.layers(), this.expandedPolygons()));
  criticalLayerPolylines = computed(() =>
    this.criticalLayers()
      .map((x) => x?.points)
      .filter((x) => x != null)
  );

  expandedPolygonPoints = computed(() =>
    this.expandedPolygons().map((x) => ({ points: [...x.topEdge, ...x.bottomEdge], layer: x.layer }))
  );

  // Labels
  layerLabels = computed(() => createLayerLabels(this.expandedPolygonPoints()));
  grainFormLabels = computed(() => this.layerLabels().gf);
  grainSizeLabels = computed(() => this.layerLabels().gs);
  lwcLabels = computed(() => {
    return this.layerLabels().lwc.map(({ value, y }) => {
      const kdv = this.lwcKdv().find((x) => x.Id === value);
      return {
        value: kdv?.Name ?? value.toString(),
        desc: kdv?.Description,
        y,
      };
    });
  });

  layerPolylines = computed(() => {
    return this.expandedPolygonPoints().map((x) => ({
      layer: x.layer,
      points: pointsToPolyline(x.points),
      isCl: x.layer.CriticalLayerTID === CriticalLayer.ENTIRE_LAYER,
      missingHardness: x.layer.HardnessTID == null || x.layer.HardnessTID == Hardness[' - '],
    }));
  });

  toGround = computed(() => !!this.data()?.IsProfileToGround);
  groundSymbolY = computed(() => {
    return this.simplePolygons().at(-1)?.bottomRight.y as number;
  });

  hardnessProjector = computed(() => createHardnessWidthProjector(this.frame()));
  hardnessAxis = computed(() => createHardnessAxis(this.frame(), this.hardnessProjector()));

  maxDepth = computed(() => Math.max(this.tempDepth(), this.layerDepth()));
  depthProjector = computed(() => createDepthProjector(this.frame(), this.maxDepth()));
  depthAxis = computed(() => createDepthAxis(this.frame(), this.maxDepth(), this.depthProjector()));

  testFormatter = computed(() => {
    const propagationKdv = this.propagationKdv();
    const fractureKdv = this.fractureKdv();
    return (test: CompressionTestEditModel, opts: { includeDepth: boolean; includeFracture: boolean }) => {
      return formatCompressionTest(test, propagationKdv, fractureKdv, opts);
    };
  });
  layerFormatter = computed(() => createSnowProfileLayerFormatter(this.translate, { wetness: this.lwcKdv() }));

  testPlots = computed(() => {
    const tests = this.tests();
    if (tests) {
      return createCompressionTestPlots(tests, this.testFormatter(), this.depthProjector());
    }
    return [];
  });

  commentRefs = viewChildren<ElementRef<HTMLDivElement>>('comment');
  commentHeights = signal<number[]>([]);

  annotationLines = computed(() => {
    const positions = this.commentYPositions();
    const heights = this.commentHeights();
    if (positions.length === 0) return [];
    if (heights.length === 0) return [];

    const targetYs = this.comments().map((x) => x.y);
    const frame = this.frame();
    const svgW = this.svgWidth();
    const scaleFactor = this.scaleFactor();

    const x1 = frame.x0 + frame.width;
    const x2 = svgW;

    return positions.map((pos, i) => {
      const commentCenterY = (pos + (heights[i] || 0) / 2) * scaleFactor;
      return {
        x1,
        y1: targetYs[i],
        x2,
        y2: commentCenterY,
      };
    });
  });

  comments = computed(() => {
    const layers = this.layers();
    const layerPolygons = this.simplePolygons();

    const rows = [];
    let counter = 0;
    for (let i = 0; i < layers.length; i++) {
      const layer = layers[i];
      const polygon = layerPolygons[i];

      if (layer.Comment) {
        counter++;
        rows.push({
          y: (polygon.topRight.y + polygon.bottomRight.y) / 2,
          key: '*' + counter,
          i,
          comment: layer.Comment,
        });
      }
    }

    return rows;
  });

  constructor() {
    afterNextRender(() => {
      this.width.set(this.elementRef.nativeElement.offsetWidth);
      this.height.set(this.elementRef.nativeElement.offsetHeight);

      const observer = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect;
        this.width.set(width);
        this.height.set(height);

        // Update comment heights
        this.updateCommentHeights();
      });

      observer.observe(this.elementRef.nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());

      // Nå vet komponenten hva bredden og høyden sin skal være, og kan evt vise kommentarer.
      // Etter de er skrevet til domen, flytt de til riktig sted - ved korresponderende lag i snøprofil
      afterNextRender(
        () => {
          this.updateCommentHeights();
        },
        { injector: this.injector }
      );
    });
  }

  readSize() {
    this.elementRef.nativeElement.contentRect;
  }

  commentYPositions = computed(() => {
    const targetYsSvg = this.comments().map((c) => c.y);
    const scaleFactor = this.scaleFactor();
    const targetYsDisplay = targetYsSvg.map((y) => y / scaleFactor);
    const availableHeight = this.height();
    const heights = this.commentHeights();
    const gap = 4;
    const n = heights.length;

    // Ideal top position: center each comment on its target y
    const positions = targetYsDisplay.map((target, i) => target - heights[i] / 2);

    // Forward pass: push down to prevent overlap
    for (let i = 1; i < n; i++) {
      const minTop = positions[i - 1] + heights[i - 1] + gap;
      if (positions[i] < minTop) {
        positions[i] = minTop;
      }
    }

    // Clamp last comment to bottom
    const lastIdx = n - 1;
    if (positions[lastIdx] + heights[lastIdx] > availableHeight) {
      positions[lastIdx] = availableHeight - heights[lastIdx];
    }

    // Backward pass: push up to prevent overlap
    for (let i = n - 2; i >= 0; i--) {
      const maxTop = positions[i + 1] - heights[i] - gap;
      if (positions[i] > maxTop) {
        positions[i] = maxTop;
      }
    }

    // Clamp first comment to top and re-do forward pass if needed
    if (positions[0] < 0) {
      positions[0] = 0;
      for (let i = 1; i < n; i++) {
        const minTop = positions[i - 1] + heights[i - 1] + gap;
        if (positions[i] < minTop) {
          positions[i] = minTop;
        }
      }
    }

    return positions;
  });

  private updateCommentHeights() {
    if (!this.showComments()) {
      return;
    }

    const heights = this.commentRefs().map((ref) => ref.nativeElement.offsetHeight);
    this.commentHeights.set(heights);
  }
}
