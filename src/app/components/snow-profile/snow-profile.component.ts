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
import {
  CompressionTestEditModel,
  SnowProfileEditModel,
  SnowTempObsModel,
  StratProfileLayerEditModel,
} from 'src/app/modules/common-regobs-api';
import { CriticalLayer, Hardness, LayerExpansionConfig, PlotFrame } from './models';
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
  groupTestsByY,
} from './plot';
import { Platform } from '@ionic/angular';
import { createSnowProfileLayerFormatter } from './formatters';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { injectSnowProfileKdvs } from './kdvs';

const PLOT_MAX_WIDTH = 700;

/**
 * Lag i snøprofilen ekspanderes for å få plass til labels.
 * Denne verdien angir hvor bred ekspanderingen skal være.
 */
const EXPAND_LAYER_POLYGON_TRANSITION_WIDTH = 20;

const AXIS_LABEL_OFFSET = 15;

@Component({
  selector: 'app-snow-profile',
  templateUrl: './snow-profile.component.html',
  styleUrls: ['./snow-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe],
})
/**
 * Rendrer en snøprofil som SVG-plott med lag, hardhet, temperatur, kompresjonstester og kommentarer.
 */
export class SnowProfileComponent {
  private elementRef = inject(ElementRef);
  private destroyRef = inject(DestroyRef);
  private platform = inject(Platform);
  private injector = inject(Injector);
  private translate = inject(TranslateService);
  private kdvs = injectSnowProfileKdvs();

  profile = input.required<SnowProfileEditModel>();
  tests = input<CompressionTestEditModel[]>();
  // useRamResistance = input(false);

  /**
   * Om akse for labels skal vises (LWC, kornstørrelse, korntype osv).
   * NB: Denne aksen fungerer ikke optimalt (labels kan overskrive hverandre) og er derfor default satt til false
   * for nå.
   */
  showLabelAxis = input(false);

  /**
   * Event for å lytte på klikk på lag i snøprofil. Kan brukes for å vise relevant info om lag utenfor profilen.
   */
  layerClick = output<{ i: number; layer: StratProfileLayerEditModel }>();

  /**
   * Vi trenger ikke rendre tooltips på mobiler, de kan ikke vises der uansett.
   */
  showTooltips = !this.platform.is('mobile');

  /**
   * Bredde - leses fra DOM etter første render
   */
  width = signal(0);

  /**
   * Høyde - leses fra DOM etter første render
   */
  height = signal(0);

  /**
   * Små profiler skaleres for å få plass til alt
   */
  private scaleFactor = computed(() => {
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

  /**
   * Om kommentarer skal vises til høyre for plottet
   */
  showComments = computed(() => this.width() > 700);

  /**
   * SVG bredde - settes ikke nødvendigvis til det samme som komponentens bredde.
   * Ved små profiler (feks i obskort-karusell), må profilen skaleres litt mindre for å få plass til alt.
   */
  private svgWidth = computed(() => {
    let width = this.width();
    if (this.showComments()) {
      width = Math.min(width * 0.7, PLOT_MAX_WIDTH);
    }
    return width * this.scaleFactor();
  });

  /**
   * SVG høyde
   */
  private svgHeight = computed(() => this.height() * this.scaleFactor());

  /**
   * SVG Viewbox attributt
   */
  viewBox = computed(() => `0 0 ${this.svgWidth()} ${this.svgHeight()}`);

  /**
   * For svært små profiler skjules aksene
   */
  showAxis = computed(() => this.width() > 100 && this.height() > 200);

  /**
   * For svært små profiler skjules labels
   */
  showLabels = computed(() => this.width() > 200);

  /**
   * Minimum lagtykkelse i profilen. Må passe med fontstørrelse for labels.
   * Lag i snøprofilen ekspanderes til denne verdien for å få plass til labels.
   */
  private minLayerHeight = 20;

  /**
   * Offset for labels på aksene (hardhet, temperatur)
   */
  axisLabelOffset = AXIS_LABEL_OFFSET;

  /**
   * x-koordinat for venstre-siden av plottet
   */
  x0 = computed(() => (this.showAxis() ? 20 : 0));

  /**
   * y-koordinat for øvre del av plottet
   */
  y0 = computed(() => (this.showTemp() ? 60 : 16));

  /**
   * Marg på høyre siden av plottet
   */
  private xMargin = computed(() => (this.showAxis() ? 70 : 0));

  /**
   * Tilgjengelig bredde for plottet
   */
  availableWidth = computed(() => {
    const width = this.svgWidth();
    return width - this.x0() - this.xMargin();
  });

  /**
   * Marg for undersiden av plottet
   */
  private yMargin = computed(() => {
    if (this.showAxis()) {
      if (this.showLabelAxis()) {
        return 60;
      }
      return 40;
    }
    return 0;
  });

  /**
   * Tilgjengelig høyde i plottet
   */
  availableHeight = computed(() => this.svgHeight() - this.y0() - this.yMargin());

  /**
   * Samle/hjelpeobjekt for størrelsen / koordinater til plottet
   */
  private frame: Signal<PlotFrame> = computed(() => ({
    width: this.availableWidth(),
    height: this.availableHeight(),
    x0: this.x0(),
    y0: this.y0(),
    axisSize: 10,
  }));

  /**
   * Liste med gyldige temperaturverdier sortert etter dybde
   */
  private temperatures = computed(() =>
    (this.profile()?.SnowTemp?.Layers || [])
      .filter((x): x is Required<SnowTempObsModel> => x.Depth != null && x.SnowTemp != null)
      .sort((a, b) => a.Depth - b.Depth)
  );

  /**
   * Om temperaturer skal vises i plottet.
   * Er false om profilen ikke har noen observerte temperaturer.
   */
  showTemp = computed(() => this.showAxis() && this.temperatures().length > 1);

  /**
   * Minimumstemperatur som skal vises i plottet.
   * Settes til -10, -20, osv avhengig av hva min temp er.
   */
  private tempMin = computed(() => {
    const minTemp = this.temperatures().reduce((min, x) => Math.min(min, x.SnowTemp ?? 0), 0);
    return Math.floor(minTemp / 10) * 10;
  });

  /**
   * Maks dybde for temperaturene.
   */
  private tempDepth = computed(() => this.temperatures().reduce((max, x) => Math.max(max, x.Depth || 0), 0));

  /**
   * Projiserer temperaturverdier til x-koordinater som passer med temperaturaksen.
   */
  private tempProjector = computed(() => createTempProjector(this.frame(), this.tempMin(), this.maxDepth()));

  /**
   * Temperaturpunkter som vises i plottet
   */
  tempPoints = computed(() => createTempPoints(this.temperatures(), this.tempProjector()));

  /**
   * Temperaturgraf/linje som vises i plottet (svg string)
   */
  tempPath = computed(() => pointsToPath(this.tempPoints()));

  /**
   * Akse for temperaturene, vises i overkant av plottet
   */
  tempAxis = computed(() => createTempAxis(this.frame(), this.tempMin(), this.tempProjector()));

  /**
   * Lagene i snøprofilen
   */
  private layers = computed(() => this.profile()?.StratProfile?.Layers || []);

  /**
   * Maks dybde for lag i snøprofilen
   */
  private layerDepth = computed(() => this.layers().reduce((depth, x) => depth + (x.Thickness || 0), 0));

  /**
   * Polygon-koordinater for lag i snøprofilen.
   * NB! Disse er IKKE ekspandert for å få plass til labels.
   */
  private simplePolygons = computed(() =>
    createLayerPolygons(this.frame(), this.layers(), this.hardnessProjector(), this.depthProjector())
  );

  /**
   * Tooltips for lag i snøprofilen.
   */
  layerTooltips = computed(() => {
    const formatter = this.formatter();
    return this.layers().map((l) => formatter.tooltip(l));
  });

  /**
   * "Sann" laghøyde, den som vises helt til høyre i plottet
   */
  private layerHeights = computed(() => this.simplePolygons().map((l) => l.bottomRight.y - l.topRight.y));

  /**
   * Ekspandert laghøyde, den som brukes for å få plass til labels.
   */
  private layerHeightsExpanded = computed(() => computeExpandedHeights(this.layerHeights(), this.minLayerHeight));

  /**
   * Konfig for ekspandering av lag for å få plass til labels
   */
  private expandLayerPolygonConfig = computed<LayerExpansionConfig>(() => {
    const minHardness = Math.min(
      Hardness.F, // F som default - korntype labels plasseres ved F
      ...this.layers()
        .map((x) => x.HardnessTID)
        .filter((x) => x != null)
        .filter((x) => x > 0)
    );
    const offset = minHardness === Hardness['F-'] ? 1 : 5;
    const end = this.hardnessProjector()(minHardness) - offset;
    let start = end - EXPAND_LAYER_POLYGON_TRANSITION_WIDTH;

    // Forsikre oss om at start ikke går ut over plot bredden til høyre
    start = Math.max(10, start);
    // Og at det fortsatt er min 1px til en slags ekspansjon. Det vil se veldig rart, men sånn er det.
    start = Math.min(start, end - 1);

    return {
      transitionOffsetFromRight: start,
      transitionWidth: end - start,
    };
  });

  /**
   * Ekspanderte lagpolygoner.
   * Lagene ekspanderes for å få plass til labels.
   * Dette objektet deler polygonene i to (topEdge og bottomEdge), fordi disse evt brukes til å markere kritiske lag.
   */
  private expandedPolygons = computed(() =>
    expandLayerPolygons(this.simplePolygons(), this.layerHeightsExpanded(), this.expandLayerPolygonConfig())
  );

  /**
   * Linjer som markerer kritiske lag. Vises oppå andre lag-polygoner, og vises rødt i plottet.
   * Plukker ut enten topEdge eller bottomEdge fra lagpolygonene, om et lag er markert som kritisk.
   */
  criticalLayerPolylines = computed(() =>
    createCriticalLayers(this.layers(), this.expandedPolygons())
      .map((x) => x?.points)
      .filter((x) => x != null)
  );

  /**
   * Finner posisjoner til labels fra ekspanderte lagtykkelser
   */
  private labelPositionsY = computed(() => {
    const heights = this.layerHeightsExpanded();
    let y1 = this.y0();
    const labelPositions = [];
    for (const height of heights) {
      const y2 = y1 + height;
      const y = (y1 + y2) / 2;
      labelPositions.push(Number(y.toFixed(1)));
      y1 = y2;
    }
    return labelPositions;
  });

  /**
   * Samleberegning av labels for lag. Gjøres sammen fordi de bruker samme y-verdi per lag, blant annet.
   */
  private layerLabels = computed(() => createLayerLabels(this.layers(), this.labelPositionsY()));

  /**
   * Label for korntype. Vises med egen korntype-font.
   * Vises i "utvidet" lag-polygon.
   * Lag-polygon må utvides hvis laget er for tynt til å vise label. Dette gjøres av "expandLayerPolygons".
   */
  grainFormLabels = computed(() => this.layerLabels().gf);

  /**
   * Labels for kornstørrelse. Vises som feks "1.5-3mm".
   */
  grainSizeLabels = computed(() => this.layerLabels().gs);

  /**
   * Labels for våthet. Vises med våthetsverdier fra KDV, feks "W" for "wet".
   */
  lwcLabels = computed(() => {
    const lwcKdv = this.kdvs().wetness;
    return this.layerLabels().lwc.map(({ value, y }) => {
      const kdv = lwcKdv.find((x) => x.Id === value);
      return {
        value: kdv?.Name ?? value.toString(),
        desc: kdv?.Description,
        y,
      };
    });
  });

  /**
   * Tester, skal vises på venstre side i profilen.
   * Vises som feks "ECTP", eller "PST End", med horisontal linje som markerer hvor i profilen testen ga brudd.
   */
  testLabels = computed(() => {
    const tests = this.tests();
    if (tests) {
      return groupTestsByY(createCompressionTestPlots(tests, this.formatter().compressionTest, this.depthProjector()));
    }
    return undefined;
  });

  /**
   * SVG polyline points per lag i snøprofilen, pluss noe tilleggsinfo som brukes til å legge til CSS-klasser,
   * feks for å markere et lag med rød farge om det er et "kritisk" lag.
   */
  layerPolylines = computed(() => {
    return this.expandedPolygons().map((x) => ({
      layer: x.layer,
      points: pointsToPolyline([...x.topEdge, ...x.bottomEdge]),
      isCl: x.layer.CriticalLayerTID === CriticalLayer.ENTIRE_LAYER,
      missingHardness: x.layer.HardnessTID == null || x.layer.HardnessTID == Hardness[' - '],
    }));
  });

  /**
   * Om snøprofilen går helt til bakken
   */
  toGround = computed(() => !!this.profile()?.IsProfileToGround);

  /**
   * y-koordinat for [GND]-symbolet som vises om profilen går til bakken.
   */
  groundSymbolY = computed(() => {
    // Bruk "dypeste" y-koordinat til underste lag i snøprofilen
    return this.simplePolygons().at(-1)?.bottomRight.y || 0;
  });

  /**
   * Projiserer hardhetsverdier til x-verdier for plotting.
   * Returnerer verdier fra høyre side av plottet, altså F har en mindre verdi enn P eller K.
   */
  private hardnessProjector = computed(() => createHardnessWidthProjector(this.frame()));

  /**
   * Akse for hardhet, vises under plottet.
   */
  hardnessAxis = computed(() => createHardnessAxis(this.frame(), this.hardnessProjector()));

  /**
   * Maks dybde i profilen, settes på bakgrunn av hva som er maks lagdybde eller temperaturdybde.
   */
  private maxDepth = computed(() => Math.max(this.tempDepth(), this.layerDepth()));

  /**
   * Projiserer dybdeverdier til y-koordinater for plotting.
   */
  private depthProjector = computed(() => createDepthProjector(this.frame(), this.maxDepth()));

  /**
   * Akse for dybde i plottet, vises på høyre siden av plottet.
   */
  depthAxis = computed(() => createDepthAxis(this.frame(), this.maxDepth(), this.depthProjector()));

  /**
   * Formateringsfunksjoner, feks for å lage en tooltip per lag i snøprofilen.
   */
  private formatter = computed(() => createSnowProfileLayerFormatter(this.translate, this.kdvs()));

  /**
   * Kommentarer i DOM, vises bare om profilen har nok tilgjengelig bredde.
   */
  private commentRefs = viewChildren<ElementRef<HTMLDivElement>>('comment');

  /**
   * Høyden på kommentarene.
   * Må beregnes for å kunne plassere kommentarene riktig i forhold til lagene i profilen.
   * Beregnes via afterNextRender etter kommentarene er lagt til i DOM.
   */
  private commentHeights = signal<number[]>([]);

  /**
   * Linjer som markerer hvor i profilen kommentarene hører til
   */
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

  /**
   * Kommentarer, y-koordinat for kommentar osv.
   */
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
      // CSSen setter at komponenten skal bruke all tilgjengelig bredde og høyde.
      // Men SVG i seg selv er ikke responsivt, og for å lage et responsivt plott må vi ha tilgjengelig bredde og
      // høyde for beregning av alt som har plottet å gjøre.
      // Her leser vi bredde og høyde fra DOM etter komponenten rendres første gangen (uten at plottet er laget enda).
      this.width.set(this.elementRef.nativeElement.offsetWidth);
      this.height.set(this.elementRef.nativeElement.offsetHeight);

      // Lytt til evt endringer i bredde og høyde og oppdater
      const observer = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect;
        this.width.set(width);
        this.height.set(height);

        // Oppdater kommentarhøyder for å sørge for at de vises riktig sted
        this.updateCommentHeights();
      });

      observer.observe(this.elementRef.nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());

      // Nå vet komponenten hva bredden og høyden sin skal være, og kan evt vise kommentarer.
      // Vi må derfor lese kommentarhøyden etter neste render igjen.
      afterNextRender(
        () => {
          this.updateCommentHeights();
        },
        { injector: this.injector }
      );
    });
  }

  /**
   * Finnes beste mulige y-posisjon for kommentarer som vises til høyre for snøprofilen
   */
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

  /**
   * Les høyde på kommentarene fra DOM
   */
  private updateCommentHeights() {
    if (!this.showComments()) {
      return;
    }

    const heights = this.commentRefs().map((ref) => ref.nativeElement.offsetHeight);
    this.commentHeights.set(heights);
  }
}
